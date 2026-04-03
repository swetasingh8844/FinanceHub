# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListAllUsers*](#listallusers)
  - [*GetUserPermissions*](#getuserpermissions)
- [**Mutations**](#mutations)
  - [*CreateNewFinancialTransaction*](#createnewfinancialtransaction)
  - [*UpdateUserLastLogin*](#updateuserlastlogin)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListAllUsers
You can execute the `ListAllUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllUsers(options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;

interface ListAllUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllUsersData, undefined>;
}
export const listAllUsersRef: ListAllUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;

interface ListAllUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListAllUsersData, undefined>;
}
export const listAllUsersRef: ListAllUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllUsersRef:
```typescript
const name = listAllUsersRef.operationName;
console.log(name);
```

### Variables
The `ListAllUsers` query has no variables.
### Return Type
Recall that executing the `ListAllUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAllUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllUsers } from '@dataconnect/generated';


// Call the `listAllUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listAllUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListAllUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllUsersRef } from '@dataconnect/generated';


// Call the `listAllUsersRef()` function to get a reference to the query.
const ref = listAllUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetUserPermissions
You can execute the `GetUserPermissions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserPermissions(vars: GetUserPermissionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserPermissionsData, GetUserPermissionsVariables>;

interface GetUserPermissionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserPermissionsVariables): QueryRef<GetUserPermissionsData, GetUserPermissionsVariables>;
}
export const getUserPermissionsRef: GetUserPermissionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserPermissions(dc: DataConnect, vars: GetUserPermissionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserPermissionsData, GetUserPermissionsVariables>;

interface GetUserPermissionsRef {
  ...
  (dc: DataConnect, vars: GetUserPermissionsVariables): QueryRef<GetUserPermissionsData, GetUserPermissionsVariables>;
}
export const getUserPermissionsRef: GetUserPermissionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserPermissionsRef:
```typescript
const name = getUserPermissionsRef.operationName;
console.log(name);
```

### Variables
The `GetUserPermissions` query requires an argument of type `GetUserPermissionsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserPermissionsVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserPermissions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserPermissionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUserPermissions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserPermissions, GetUserPermissionsVariables } from '@dataconnect/generated';

// The `GetUserPermissions` query requires an argument of type `GetUserPermissionsVariables`:
const getUserPermissionsVars: GetUserPermissionsVariables = {
  userId: ..., 
};

// Call the `getUserPermissions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserPermissions(getUserPermissionsVars);
// Variables can be defined inline as well.
const { data } = await getUserPermissions({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserPermissions(dataConnect, getUserPermissionsVars);

console.log(data.user);

// Or, you can use the `Promise` API.
getUserPermissions(getUserPermissionsVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUserPermissions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserPermissionsRef, GetUserPermissionsVariables } from '@dataconnect/generated';

// The `GetUserPermissions` query requires an argument of type `GetUserPermissionsVariables`:
const getUserPermissionsVars: GetUserPermissionsVariables = {
  userId: ..., 
};

// Call the `getUserPermissionsRef()` function to get a reference to the query.
const ref = getUserPermissionsRef(getUserPermissionsVars);
// Variables can be defined inline as well.
const ref = getUserPermissionsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserPermissionsRef(dataConnect, getUserPermissionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateNewFinancialTransaction
You can execute the `CreateNewFinancialTransaction` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNewFinancialTransaction(vars: CreateNewFinancialTransactionVariables): MutationPromise<CreateNewFinancialTransactionData, CreateNewFinancialTransactionVariables>;

interface CreateNewFinancialTransactionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewFinancialTransactionVariables): MutationRef<CreateNewFinancialTransactionData, CreateNewFinancialTransactionVariables>;
}
export const createNewFinancialTransactionRef: CreateNewFinancialTransactionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNewFinancialTransaction(dc: DataConnect, vars: CreateNewFinancialTransactionVariables): MutationPromise<CreateNewFinancialTransactionData, CreateNewFinancialTransactionVariables>;

interface CreateNewFinancialTransactionRef {
  ...
  (dc: DataConnect, vars: CreateNewFinancialTransactionVariables): MutationRef<CreateNewFinancialTransactionData, CreateNewFinancialTransactionVariables>;
}
export const createNewFinancialTransactionRef: CreateNewFinancialTransactionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNewFinancialTransactionRef:
```typescript
const name = createNewFinancialTransactionRef.operationName;
console.log(name);
```

### Variables
The `CreateNewFinancialTransaction` mutation requires an argument of type `CreateNewFinancialTransactionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNewFinancialTransactionVariables {
  amount: number;
  type: string;
  description: string;
  transactionDate: DateString;
  category?: string | null;
  referenceNumber?: string | null;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `CreateNewFinancialTransaction` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNewFinancialTransactionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNewFinancialTransactionData {
  financialTransaction_insert: FinancialTransaction_Key;
}
```
### Using `CreateNewFinancialTransaction`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNewFinancialTransaction, CreateNewFinancialTransactionVariables } from '@dataconnect/generated';

// The `CreateNewFinancialTransaction` mutation requires an argument of type `CreateNewFinancialTransactionVariables`:
const createNewFinancialTransactionVars: CreateNewFinancialTransactionVariables = {
  amount: ..., 
  type: ..., 
  description: ..., 
  transactionDate: ..., 
  category: ..., // optional
  referenceNumber: ..., // optional
  notes: ..., // optional
};

// Call the `createNewFinancialTransaction()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNewFinancialTransaction(createNewFinancialTransactionVars);
// Variables can be defined inline as well.
const { data } = await createNewFinancialTransaction({ amount: ..., type: ..., description: ..., transactionDate: ..., category: ..., referenceNumber: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNewFinancialTransaction(dataConnect, createNewFinancialTransactionVars);

console.log(data.financialTransaction_insert);

// Or, you can use the `Promise` API.
createNewFinancialTransaction(createNewFinancialTransactionVars).then((response) => {
  const data = response.data;
  console.log(data.financialTransaction_insert);
});
```

### Using `CreateNewFinancialTransaction`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNewFinancialTransactionRef, CreateNewFinancialTransactionVariables } from '@dataconnect/generated';

// The `CreateNewFinancialTransaction` mutation requires an argument of type `CreateNewFinancialTransactionVariables`:
const createNewFinancialTransactionVars: CreateNewFinancialTransactionVariables = {
  amount: ..., 
  type: ..., 
  description: ..., 
  transactionDate: ..., 
  category: ..., // optional
  referenceNumber: ..., // optional
  notes: ..., // optional
};

// Call the `createNewFinancialTransactionRef()` function to get a reference to the mutation.
const ref = createNewFinancialTransactionRef(createNewFinancialTransactionVars);
// Variables can be defined inline as well.
const ref = createNewFinancialTransactionRef({ amount: ..., type: ..., description: ..., transactionDate: ..., category: ..., referenceNumber: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNewFinancialTransactionRef(dataConnect, createNewFinancialTransactionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.financialTransaction_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.financialTransaction_insert);
});
```

## UpdateUserLastLogin
You can execute the `UpdateUserLastLogin` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUserLastLogin(): MutationPromise<UpdateUserLastLoginData, undefined>;

interface UpdateUserLastLoginRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateUserLastLoginData, undefined>;
}
export const updateUserLastLoginRef: UpdateUserLastLoginRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserLastLogin(dc: DataConnect): MutationPromise<UpdateUserLastLoginData, undefined>;

interface UpdateUserLastLoginRef {
  ...
  (dc: DataConnect): MutationRef<UpdateUserLastLoginData, undefined>;
}
export const updateUserLastLoginRef: UpdateUserLastLoginRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserLastLoginRef:
```typescript
const name = updateUserLastLoginRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserLastLogin` mutation has no variables.
### Return Type
Recall that executing the `UpdateUserLastLogin` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserLastLoginData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserLastLoginData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUserLastLogin`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserLastLogin } from '@dataconnect/generated';


// Call the `updateUserLastLogin()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserLastLogin();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserLastLogin(dataConnect);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUserLastLogin().then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUserLastLogin`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserLastLoginRef } from '@dataconnect/generated';


// Call the `updateUserLastLoginRef()` function to get a reference to the mutation.
const ref = updateUserLastLoginRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserLastLoginRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

