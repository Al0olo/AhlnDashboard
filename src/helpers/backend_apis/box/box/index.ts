import { APIClient } from "../../../api_helper";

import * as url from "../../../backend_urls/box/box";

const api = new APIClient();

// BOX
// Fetches boxes for a given user
export const getBoxes = () => {
  return api.get(url.GET_BOXES);
};
// Get One Box
export const getOneBox = (data: any) => {
  return api.get(url.GET_ONE_BOX, data);
};
// Add Box
export const addBox = (data: any) => {
  return api.create(url.ADD_BOX, data);
};
// Update Exsiting Box
export const updateBox = (data: any) => {
  return api.update(`${url.UPDATE_BOX}/${data.id}`, data);
};
// Delete Box
export const deleteBox = (data: any) => {
  return api.delete(`${url.DELETE_BOX}/${data}`);
};
