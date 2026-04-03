import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, Receipt, Users, LogOut, Menu, X, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile, logout, isAdmin, isAnalyst } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard, show: true },
    { label: 'Transactions', path: '/transactions', icon: Receipt, show: isAnalyst },
    { label: 'Users', path: '/users', icon: Users, show: isAdmin },
    { label: 'API Docs', path: '/api-docs', icon: FileText, show: true, external: true },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col md:flex-row relative">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-brand-950 border-r border-white/5 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 shadow-2xl",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-white/5">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white text-lg shadow-lg shadow-brand-500/20">F</span>
              FinanceHub
            </h1>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.filter(item => item.show).map((item) => (
              item.external ? (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-brand-300 hover:bg-white/5 hover:text-white"
                >
                  <item.icon className="w-5 h-5 text-brand-500" />
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    location.pathname === item.path
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-brand-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className={cn("w-5 h-5", location.pathname === item.path ? "text-brand-400" : "text-brand-500")} />
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-white/5 rounded-2xl border border-white/5">
              <div className="w-10 h-10 rounded-full bg-brand-800 flex items-center justify-center text-brand-100 font-bold shadow-inner">
                {profile?.displayName?.[0] || profile?.email?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{profile?.displayName || 'User'}</p>
                <p className="text-[10px] font-bold text-brand-400 uppercase tracking-wider">{profile?.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 md:hidden">
          <h1 className="text-lg font-bold text-neutral-900">FinanceHub</h1>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-neutral-600">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </div>
      </main>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-neutral-900/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
