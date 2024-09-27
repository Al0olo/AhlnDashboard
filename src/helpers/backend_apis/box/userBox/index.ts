import { APIClient } from "../../../api_helper";

import * as url from "../../../backend_urls/box/userBox";

const api = new APIClient();

// USER_BOX
// Fetches user boxes for admin
export const getUserBoxes = () => {
  return api.get(url.GET_USER_BOXES);
};
// Get One User Box
export const getOneUserBox = (data: any) => {
  return api.get(url.GET_ONE_USER_BOX);
};
// Assign User Box
export const assignUserBox = (data: any) => {
  return api.create(url.ASSIGN_USER_BOX, data);
};
// Update Exsiting User Box
export const updateUserBox = (data: any) => {
  return api.update(url.UPDATE_USER_BOX + `/${data.id}`, data);
};
// Update User Box Status
export const updateUserBoxStatus = (data: any) => {
  return api.update(url.UPDATE_USER_BOX_STATUS + `/${data.id}`, data);
};

export const updateUserBoxStatusApi = (data: any) => {
  return api.update(url.UPDATE_USER_BOX + `/${data.id}`, data);
};

// Delete User Box
export const deleteUserBox = (data: any) => {
  return api.delete(`${url.DELETE_USER_BOX}/${data}`);
};
