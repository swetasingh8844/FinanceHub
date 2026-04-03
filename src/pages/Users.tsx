import React, { useEffect, useState } from 'react';
import { db, collection, onSnapshot, query, updateDoc, doc } from '../firebase';
import { UserProfile, UserRole, UserStatus } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { formatDate, cn } from '../lib/utils';
import { Shield, User as UserIcon, Mail, Calendar, CheckCircle, XCircle } from 'lucide-react';

const Users: React.FC = () => {
  const { profile: currentUserProfile, isAdmin } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({
        ...doc.data()
      })) as UserProfile[]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await updateDoc(doc(db, 'users', userId), { role: newRole });
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleStatusChange = async (userId: string, newStatus: UserStatus) => {
    try {
      await updateDoc(doc(db, 'users', userId), { status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">Access Denied</h2>
        <p className="text-neutral-500 mt-2">Only administrators can access this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-4xl font-bold text-neutral-900 tracking-tight">User Management</h2>
        <p className="text-neutral-500 mt-1">Manage system access and user roles.</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
          </div>
        ) : users.length > 0 ? (
          users.map((user) => (
            <div key={user.uid} className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 font-bold text-xl shadow-inner">
                  {user.displayName?.[0] || user.email?.[0]?.toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-neutral-900">{user.displayName || 'Anonymous User'}</h3>
                    {user.uid === currentUserProfile?.uid && (
                      <span className="px-2 py-0.5 bg-brand-50 text-brand-600 text-[10px] font-bold uppercase tracking-wider rounded-full">You</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                      <Mail className="w-3.5 h-3.5 text-neutral-400" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      Joined {formatDate(user.createdAt)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Role</label>
                  <select 
                    value={user.role}
                    disabled={user.uid === currentUserProfile?.uid}
                    onChange={(e) => handleRoleChange(user.uid, e.target.value as UserRole)}
                    className="block w-full bg-white border border-neutral-200 rounded-xl px-4 py-2 text-sm font-bold text-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    <option value="viewer">Viewer</option>
                    <option value="analyst">Analyst</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Status</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStatusChange(user.uid, user.status === 'active' ? 'inactive' : 'active')}
                      disabled={user.uid === currentUserProfile?.uid}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm",
                        user.status === 'active' 
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" 
                          : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                      )}
                    >
                      {user.status === 'active' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {user.status}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center bg-white/50 backdrop-blur-sm rounded-3xl border border-neutral-200 border-dashed">
            <p className="text-neutral-500 font-medium">No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
