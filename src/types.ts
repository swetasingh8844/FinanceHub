import { Timestamp } from 'firebase/firestore';

export type UserRole = 'admin' | 'analyst' | 'viewer';
export type UserStatus = 'active' | 'inactive';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: Timestamp | string;
}

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id?: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: Timestamp | string;
  description?: string;
  createdBy: string;
  createdAt?: Timestamp | string;
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  categoryTotals: Record<string, number>;
  recentActivity: Transaction[];
}
