import { APIClient } from "../../../api_helper";

import * as url from "../../../backend_urls/box/tablet";

const api = new APIClient();

// TABLET
// Get Tablets
export const getTablets = () => {
  return api.get(url.GET_TABLETS);
};
// Get One Tablet
export const getOneTablet = (data: any) => {
  return api.get(url.GET_TABLETS);
};
// Add Tablet
export const addTablet = (data: any) => {
  return api.create(url.ADD_TABLET, data);
};
// Update Exsiting Tablet
export const updateTablet = (data: any) => {
  return api.update(`${url.UPDATE_TABLET}/${data.id}`, data);
};
// Delete Tablet
export const deleteTablet = (data: any) => {
  return api.delete(`${url.DELETE_TABLET}/${data}`);
};

export const resetTabletToBox = (data: any) => {
  return api.create(url.RESET_TABLET_TO_BOX, data);
};
