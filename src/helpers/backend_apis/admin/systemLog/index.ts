import { APIClient } from "../../../api_helper";

import * as url from "../../../backend_urls/admin/systmeLog";

const api = new APIClient();

// SYSTEM LOG
// Fetch All System Logs
export const getSystemLogApi = () => {
  return api.get(url.GET_SYSTEM_LOG);
};

// Get One System Log
export const getOneSystemLogApi = (data: any) => {
  return api.get(`${url.GET_ONE_SYSTEM_LOG}/${data}`);
};

// Delete System Log
export const deleteSystemLogApi = (data: any) => {
  return api.delete(`${url.DELETE_SYSTEM_LOG}/${data}`);
};
