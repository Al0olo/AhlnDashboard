import { APIClient } from "../../../api_helper";

import * as url from "../../../backend_urls/userManagement/rolePermission";

const api = new APIClient();

// PERMISSION
// Fetches permissions for admin
export const getRolePermissions = () => {
  return api.get(url.GET_ROLE_PERMISSIONS);
};
// Get One Permission
export const getOneRolePermission = (data: any) => {
  return api.get(url.GET_ONE_ROLE_PERMISSION + `/${data}`);
};
// Assign Role Permission
export const assignRolePermission = (data: any) => {
  return api.create(url.ASSIGN_ROLE_PERMISSION, data);
};

// Revoke Role Permission
export const revokeRolePermission = (data: any) => {
  return api.create(url.REVOKE_ROLE_PERMISSION, data);
};
