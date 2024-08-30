import { APIClient } from "../../../api_helper";

import * as url from "../../../backend_urls/userManagement/role";

const api = new APIClient();

// ROLE
// Fetches rolees for admin
export const getRoles = () => {
  return api.get(url.GET_ROLES);
};
// Get One Role
export const getOneRole = (data: any) => {
  return api.get(url.GET_ONE_ROLE);
};
// Add Role
export const addRole = (data: any) => {
  return api.create(url.ADD_ROLE, data);
};
// Update Exsiting Role
export const updateRole = (data: any) => {
  return api.update(url.UPDATE_ROLE + `/${data.id}`, data);
};
// Delete Role
export const deleteRole = (data: any) => {
  return api.delete(`${url.DELETE_ROLE}/${data}`);
};
