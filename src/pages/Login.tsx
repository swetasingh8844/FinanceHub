import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Wallet, LogIn } from 'lucide-react';

const Login: React.FC = () => {
  const { user, login, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 p-6">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl border border-neutral-200 shadow-xl text-center space-y-8 animate-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-brand-600 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-brand-500/20">
            F
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 tracking-tight">FinanceHub</h1>
          <p className="text-neutral-500 max-w-xs mx-auto font-medium">
            Your personal financial dashboard for tracking income, expenses, and trends.
          </p>
        </div>

        <div className="space-y-6">
          <button
            onClick={login}
            className="w-full flex items-center justify-center gap-3 bg-brand-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-brand-500/20"
          >
            <LogIn className="w-5 h-5" />
            Sign in with Google
          </button>
          
          <div className="flex items-center gap-4 text-neutral-300">
            <div className="h-px bg-neutral-200 flex-1" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Secure Access</span>
            <div className="h-px bg-neutral-200 flex-1" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white/50 rounded-2xl border border-neutral-100 shadow-sm">
              <div className="w-8 h-8 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Wallet className="w-4 h-4" />
              </div>
              <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Budget</p>
            </div>
            <div className="p-4 bg-white/50 rounded-2xl border border-neutral-100 shadow-sm">
              <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                <LogIn className="w-4 h-4" />
              </div>
              <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Income</p>
            </div>
            <div className="p-4 bg-white/50 rounded-2xl border border-neutral-100 shadow-sm">
              <div className="w-8 h-8 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                <LogIn className="w-4 h-4" />
              </div>
              <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Expense</p>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-medium">
          Secure Financial Management System
        </p>
      </div>
    </div>
  );
};

export default Login;
