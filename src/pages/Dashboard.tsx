import React, { useEffect, useState } from 'react';
import { db, collection, onSnapshot, query, orderBy } from '../firebase';
import { Transaction, DashboardSummary } from '../types';
import { formatCurrency, formatDate, cn } from '../lib/utils';
import { TrendingUp, TrendingDown, Wallet, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
    categoryTotals: {},
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'transactions'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const transactions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Transaction[];

      const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      const categoryTotals = transactions.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

      setSummary({
        totalIncome,
        totalExpenses,
        netBalance: totalIncome - totalExpenses,
        categoryTotals,
        recentActivity: transactions.slice(0, 5),
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const copyToken = async () => {
    const token = await user?.getIdToken(true);
    await navigator.clipboard.writeText(token || '');
    alert('Token copied to clipboard! Paste it in Swagger Authorize.');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  const stats = [
    { label: 'Net Balance', value: summary.netBalance, icon: Wallet, color: 'text-brand-600', bg: 'bg-brand-50' },
    { label: 'Total Income', value: summary.totalIncome, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Expenses', value: summary.totalExpenses, icon: TrendingDown, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-4xl font-bold text-neutral-900 tracking-tight">Overview</h2>
        <p className="text-neutral-500 mt-1">Real-time financial performance and activity.</p>
        <button
          onClick={copyToken}
          className="mt-2 text-xs px-3 py-1 bg-brand-600 text-white rounded-lg"
        >
          Copy Auth Token
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-3 rounded-2xl", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
            </div>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-bold text-neutral-900 mt-1 tabular-nums">{formatCurrency(stat.value)}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-neutral-400" />
              Recent Activity
            </h3>
            <Link to="/transactions" className="text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-neutral-100">
            {summary.recentActivity.length > 0 ? (
              summary.recentActivity.map((transaction) => (
                <div key={transaction.id} className="p-6 flex items-center justify-between hover:bg-neutral-50 transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm",
                      transaction.type === 'income' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                    )}>
                      {transaction.type === 'income' ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-neutral-900">{transaction.category}</p>
                      <p className="text-xs text-neutral-400 font-medium">{formatDate(transaction.date)}</p>
                    </div>
                  </div>
                  <p className={cn(
                    "text-sm font-bold tabular-nums",
                    transaction.type === 'income' ? "text-emerald-600" : "text-rose-600"
                  )}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <p className="text-neutral-500">No recent transactions found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-neutral-900 mb-6">Category Breakdown</h3>
          <div className="space-y-6">
            {Object.entries(summary.categoryTotals).length > 0 ? (
              Object.entries(summary.categoryTotals)
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .map(([category, total]) => (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-neutral-700">{category}</span>
                      <span className="font-bold text-neutral-900 tabular-nums">{formatCurrency(total as number)}</span>
                    </div>
                    <div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-brand-600 rounded-full shadow-sm"
                        style={{ width: `${Math.min(((total as number) / Math.max(...Object.values(summary.categoryTotals) as number[])) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))
            ) : (
              <div className="p-12 text-center">
                <p className="text-neutral-500">No data available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;