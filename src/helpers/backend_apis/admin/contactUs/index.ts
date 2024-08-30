import { APIClient } from "../../../api_helper";

import * as url from "../../../backend_urls/admin/contactUs";

const api = new APIClient();

// CONTACT US
// Fetch All Contact Us
export const getContactUsApi = () => {
  return api.get(url.GET_CONTACT_US);
};

// Get One Contact Us
export const getOneContactUsApi = (data: any) => {
  return api.get(`${url.GET_ONE_CONTACT_US}/${data}`);
};

// Delete Contact Us
export const deleteContactUsApi = (data: any) => {
  return api.delete(`${url.DELETE_CONTACT_US}/${data}`);
};
