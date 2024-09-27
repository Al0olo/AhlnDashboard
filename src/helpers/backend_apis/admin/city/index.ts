import { APIClient } from "../../../api_helper";

import * as url from "../../../backend_urls/admin/city";

const api = new APIClient();

// CITY
// Fetch All City
export const getCityApi = () => {
  return api.get(url.GET_CITY);
};

// Fetch All City in country
export const getCityInCountryApi = (data: any) => {
  return api.get(`${url.GET_CITY_IN_COUNTRY}/${data}`);
};

// Get One City
export const getOneCityApi = (data: any) => {
  return api.get(`${url.GET_ONE_CITY}/${data}`);
};

// Add City
export const addCityApi = (data: any) => {
  return api.create(url.ADD_CITY, data);
};

// Update City
export const updateCityApi = (data: any) => {
  return api.update(`${url.UPDATE_CITY}/${data.id}`, data);
};

// Delete City
export const deleteCityApi = (data: any) => {
  return api.delete(`${url.DELETE_CITY}/${data}`);
};
