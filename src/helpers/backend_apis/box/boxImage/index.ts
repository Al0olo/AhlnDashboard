import { APIClient } from "../../../api_helper";

import * as url from "../../../backend_urls/box/boxImage";

const api = new APIClient();

// Get All Box Images
export const getBoxImages = () => {
  return api.get(url.GET_BOX_IMAGES);
};
