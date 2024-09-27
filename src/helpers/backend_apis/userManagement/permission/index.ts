import { APIClient } from "../../../api_helper";

import * as url from "../../../backend_urls/userManagement/permission";

const api = new APIClient();

// PERMISSION
// Fetches permissions for admin
export const getPermissions = () => {
  return api.get(url.GET_PERMISSIONS);
};
// Get One Permission
export const getOnePermission = (data: any) => {
  return api.get(url.GET_ONE_PERMISSION);
};
// Add Permission
export const addPermission = (data: any) => {
  return api.create(url.ADD_PERMISSION, data);
};
// Update Exsiting Permission
export const updatePermission = (data: any) => {
  return api.update(url.UPDATE_PERMISSION + `/${data.id}`, data);
};
// Delete Permission
export const deletePermission = (data: any) => {
  return api.delete(`${url.DELETE_PERMISSION}/${data}`);
};
