import { ListAllUsersData, CreateNewFinancialTransactionData, CreateNewFinancialTransactionVariables, GetUserPermissionsData, GetUserPermissionsVariables, UpdateUserLastLoginData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useListAllUsers(options?: useDataConnectQueryOptions<ListAllUsersData>): UseDataConnectQueryResult<ListAllUsersData, undefined>;
export function useListAllUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListAllUsersData>): UseDataConnectQueryResult<ListAllUsersData, undefined>;

export function useCreateNewFinancialTransaction(options?: useDataConnectMutationOptions<CreateNewFinancialTransactionData, FirebaseError, CreateNewFinancialTransactionVariables>): UseDataConnectMutationResult<CreateNewFinancialTransactionData, CreateNewFinancialTransactionVariables>;
export function useCreateNewFinancialTransaction(dc: DataConnect, options?: useDataConnectMutationOptions<CreateNewFinancialTransactionData, FirebaseError, CreateNewFinancialTransactionVariables>): UseDataConnectMutationResult<CreateNewFinancialTransactionData, CreateNewFinancialTransactionVariables>;

export function useGetUserPermissions(vars: GetUserPermissionsVariables, options?: useDataConnectQueryOptions<GetUserPermissionsData>): UseDataConnectQueryResult<GetUserPermissionsData, GetUserPermissionsVariables>;
export function useGetUserPermissions(dc: DataConnect, vars: GetUserPermissionsVariables, options?: useDataConnectQueryOptions<GetUserPermissionsData>): UseDataConnectQueryResult<GetUserPermissionsData, GetUserPermissionsVariables>;

export function useUpdateUserLastLogin(options?: useDataConnectMutationOptions<UpdateUserLastLoginData, FirebaseError, void>): UseDataConnectMutationResult<UpdateUserLastLoginData, undefined>;
export function useUpdateUserLastLogin(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserLastLoginData, FirebaseError, void>): UseDataConnectMutationResult<UpdateUserLastLoginData, undefined>;
