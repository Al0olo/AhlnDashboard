import { APIClient } from "../../api_helper";

import * as url from "../../backend_urls/delivery";

const api = new APIClient();

// DELIVERY

// Get Delivery Packages
export const getDeliveryPackages = () => {
  return api.get(url.GET_DELIVERY_ALL);
};
// Get One Delivery Package
export const getOneDeliveryPackage = (data: any) => {
  return api.get(`${url.GET_ONE_DELIVERY}/${data}`);
};

// Fetches shippingcompanies for a given user
export const getShippingCompanies = () => {
  return api.get(url.GET_SHIPPING_COMPANIES);
};
// Get One shippingcompani
export const getOneShippingCompany = (data: any) => {
  return api.get(url.GET_ONE_SHIPPING_COMPANY);
};
// Add shippingcompani
export const addShippingCompany = (data: any) => {
  return api.get(url.ADD_SHIPPING_COMPANY, data);
};
// Update Exsiting shippingcompani
export const updateShippingCompany = (data: any) => {
  return api.get(url.UPDATE_SHIPPING_COMPANY, data);
};
// Delete shippingcompani
export const deleteShippingCompany = (data: any) => {
  return api.delete(`${url.DELETE_SHIPPING_COMPANY}/${data}`);
};
