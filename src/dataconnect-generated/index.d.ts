import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateNewFinancialTransactionData {
  financialTransaction_insert: FinancialTransaction_Key;
}

export interface CreateNewFinancialTransactionVariables {
  amount: number;
  type: string;
  description: string;
  transactionDate: DateString;
  category?: string | null;
  referenceNumber?: string | null;
  notes?: string | null;
}

export interface FinancialTransaction_Key {
  id: UUIDString;
  __typename?: 'FinancialTransaction_Key';
}

export interface GetUserPermissionsData {
  user?: {
    id: UUIDString;
    username: string;
    role: {
      name: string;
      permissions_via_RolePermission: ({
        id: UUIDString;
        name: string;
        description?: string | null;
      } & Permission_Key)[];
    };
  } & User_Key;
}

export interface GetUserPermissionsVariables {
  userId: UUIDString;
}

export interface ListAllUsersData {
  users: ({
    id: UUIDString;
    username: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    createdAt: TimestampString;
    lastLogin?: TimestampString | null;
    role: {
      name: string;
    };
  } & User_Key)[];
}

export interface Permission_Key {
  id: UUIDString;
  __typename?: 'Permission_Key';
}

export interface RolePermission_Key {
  roleId: UUIDString;
  permissionId: UUIDString;
  __typename?: 'RolePermission_Key';
}

export interface Role_Key {
  id: UUIDString;
  __typename?: 'Role_Key';
}

export interface UpdateUserLastLoginData {
  user_update?: User_Key | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface ListAllUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllUsersData, undefined>;
  operationName: string;
}
export const listAllUsersRef: ListAllUsersRef;

export function listAllUsers(options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;
export function listAllUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;

interface CreateNewFinancialTransactionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewFinancialTransactionVariables): MutationRef<CreateNewFinancialTransactionData, CreateNewFinancialTransactionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewFinancialTransactionVariables): MutationRef<CreateNewFinancialTransactionData, CreateNewFinancialTransactionVariables>;
  operationName: string;
}
export const createNewFinancialTransactionRef: CreateNewFinancialTransactionRef;

export function createNewFinancialTransaction(vars: CreateNewFinancialTransactionVariables): MutationPromise<CreateNewFinancialTransactionData, CreateNewFinancialTransactionVariables>;
export function createNewFinancialTransaction(dc: DataConnect, vars: CreateNewFinancialTransactionVariables): MutationPromise<CreateNewFinancialTransactionData, CreateNewFinancialTransactionVariables>;

interface GetUserPermissionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserPermissionsVariables): QueryRef<GetUserPermissionsData, GetUserPermissionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserPermissionsVariables): QueryRef<GetUserPermissionsData, GetUserPermissionsVariables>;
  operationName: string;
}
export const getUserPermissionsRef: GetUserPermissionsRef;

export function getUserPermissions(vars: GetUserPermissionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserPermissionsData, GetUserPermissionsVariables>;
export function getUserPermissions(dc: DataConnect, vars: GetUserPermissionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserPermissionsData, GetUserPermissionsVariables>;

interface UpdateUserLastLoginRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateUserLastLoginData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateUserLastLoginData, undefined>;
  operationName: string;
}
export const updateUserLastLoginRef: UpdateUserLastLoginRef;

export function updateUserLastLogin(): MutationPromise<UpdateUserLastLoginData, undefined>;
export function updateUserLastLogin(dc: DataConnect): MutationPromise<UpdateUserLastLoginData, undefined>;

