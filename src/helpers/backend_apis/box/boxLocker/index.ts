import { APIClient } from "../../../api_helper";

import * as url from "../../../backend_urls/box/boxLocker";

const api = new APIClient();

// BOX_LOCKER
// Get BoxLockers
export const getBoxLockers = () => {
  return api.get(url.GET_BOX_LOCKERS);
};

// Update Exsiting BoxLocker
export const updateBoxLocker = (data: any) => {
  return api.update(`${url.UPDATE_BOX_LOCKER}/${data.id}`, data);
};
// Delete BoxLocker
export const deleteBoxLocker = (data: any) => {
  return api.delete(`${url.DELETE_BOX_LOCKER}/${data}`);
};
