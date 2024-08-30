import { APIClient } from "../../../api_helper";

import * as url from "../../../backend_urls/userManagement/userPermission";

const api = new APIClient();

// PERMISSION
// Fetches permissions for admin
export const getUserPermissions = () => {
  return api.get(url.GET_USER_PERMISSIONS);
};
// Get One Permission
export const getOneUserPermission = (data: any) => {
  return api.get(url.GET_ONE_USER_PERMISSION + `/${data}`);
};
// Assign User Permission
export const assignUserPermission = (data: any) => {
  return api.create(url.ASSIGN_USER_PERMISSION, data);
};

// Revoke User Permission
export const revokeUserPermission = (data: any) => {
  return api.create(url.REVOKE_USER_PERMISSION, data);
};
