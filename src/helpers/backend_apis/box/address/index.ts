import { APIClient } from "../../../api_helper";

import * as url from "../../../backend_urls/box/address";

const api = new APIClient();

// ADDRESS
// Get Addresses
export const getAddresses = () => {
  return api.get(url.GET_ADDRESS);
};
// Get One Address
export const getOneAddress = (data: any) => {
  return api.get(url.GET_ADDRESS);
};
// Add Address
export const addAddress = (data: any) => {
  return api.create(url.ADD_ADDRESS, data);
};
// Update Exsiting Address
export const updateAddress = (data: any) => {
  return api.update(`${url.UPDATE_ADDRESS}/${data.id}`, data);
};
// Delete Address
export const deleteAddress = (data: any) => {
  return api.delete(`${url.DELETE_ADDRESS}/${data}`, data.user_id);
};
