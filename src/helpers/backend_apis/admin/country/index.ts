import { APIClient } from "../../../api_helper";

import * as url from "../../../backend_urls/admin/country";

const api = new APIClient();

// COUNTRY
// Fetch All Country
export const getCountryApi = () => {
  return api.get(url.GET_COUNTRY);
};

// Get One Country
export const getOneCountryApi = (data: any) => {
  return api.get(`${url.GET_ONE_COUNTRY}/${data}`);
};

// Add Country
export const addCountryApi = (data: any) => {
  return api.create(url.ADD_COUNTRY, data);
};

// Update Country
export const updateCountryApi = (data: any) => {
  return api.update(`${url.UPDATE_COUNTRY}/${data.id}`, data);
};

// Delete Country
export const deleteCountryApi = (data: any) => {
  return api.delete(`${url.DELETE_COUNTRY}/${data}`);
};
