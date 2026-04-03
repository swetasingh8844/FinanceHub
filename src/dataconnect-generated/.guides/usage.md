# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useListAllUsers, useCreateNewFinancialTransaction, useGetUserPermissions, useUpdateUserLastLogin } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useListAllUsers();

const { data, isPending, isSuccess, isError, error } = useCreateNewFinancialTransaction(createNewFinancialTransactionVars);

const { data, isPending, isSuccess, isError, error } = useGetUserPermissions(getUserPermissionsVars);

const { data, isPending, isSuccess, isError, error } = useUpdateUserLastLogin();

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { listAllUsers, createNewFinancialTransaction, getUserPermissions, updateUserLastLogin } from '@dataconnect/generated';


// Operation ListAllUsers: 
const { data } = await ListAllUsers(dataConnect);

// Operation CreateNewFinancialTransaction:  For variables, look at type CreateNewFinancialTransactionVars in ../index.d.ts
const { data } = await CreateNewFinancialTransaction(dataConnect, createNewFinancialTransactionVars);

// Operation GetUserPermissions:  For variables, look at type GetUserPermissionsVars in ../index.d.ts
const { data } = await GetUserPermissions(dataConnect, getUserPermissionsVars);

// Operation UpdateUserLastLogin: 
const { data } = await UpdateUserLastLogin(dataConnect);


```