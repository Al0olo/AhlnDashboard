import { APIClient } from "../../../api_helper";

import * as url from "../../../backend_urls/box/boxGeneration";

const api = new APIClient();

// BOX GENERATION
// Get BoxGenerations
export const getBoxGenerations = () => {
  return api.get(url.GET_BOX_GENERATIONS);
};
// Get One BoxGeneration
export const getOneBoxGeneration = (data: any) => {
  return api.get(url.GET_BOX_GENERATIONS);
};
// Add BoxGeneration
export const addBoxGeneration = (data: any) => {
  return api.create(url.ADD_BOX_GENERATION, data);
};
// Update Exsiting BoxGeneration
export const updateBoxGeneration = (data: any) => {
  return api.update(`${url.UPDATE_BOX_GENERATION}/${data.id}`, data);
};
// Delete BoxGeneration
export const deleteBoxGeneration = (data: any) => {
  return api.delete(`${url.DELETE_BOX_GENERATION}/${data}`);
};
