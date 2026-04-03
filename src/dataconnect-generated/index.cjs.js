const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'financehub',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const listAllUsersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllUsers');
}
listAllUsersRef.operationName = 'ListAllUsers';
exports.listAllUsersRef = listAllUsersRef;

exports.listAllUsers = function listAllUsers(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAllUsersRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const createNewFinancialTransactionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewFinancialTransaction', inputVars);
}
createNewFinancialTransactionRef.operationName = 'CreateNewFinancialTransaction';
exports.createNewFinancialTransactionRef = createNewFinancialTransactionRef;

exports.createNewFinancialTransaction = function createNewFinancialTransaction(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createNewFinancialTransactionRef(dcInstance, inputVars));
}
;

const getUserPermissionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserPermissions', inputVars);
}
getUserPermissionsRef.operationName = 'GetUserPermissions';
exports.getUserPermissionsRef = getUserPermissionsRef;

exports.getUserPermissions = function getUserPermissions(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserPermissionsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const updateUserLastLoginRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserLastLogin');
}
updateUserLastLoginRef.operationName = 'UpdateUserLastLogin';
exports.updateUserLastLoginRef = updateUserLastLoginRef;

exports.updateUserLastLogin = function updateUserLastLogin(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(updateUserLastLoginRef(dcInstance, inputVars));
}
;
