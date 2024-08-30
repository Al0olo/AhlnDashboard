import { APIClient } from "helpers/api_helper";
import * as url from "../../../backend_urls/admin/auditTrail";

const api = new APIClient();

// AUDIT TRAIL
// Fetch All Audit Trails
export const getAuditTrailApi = () => {
  return api.get(url.GET_AUDIT_TRAIL);
};

// Get One Audit Trail
export const getOneAuditTrailApi = (data: any) => {
  return api.get(`${url.GET_ONE_AUDIT_TRAIL}/${data}`);
};

// Delete Audit Trail
export const deleteAuditTrailApi = (data: any) => {
  return api.delete(`${url.DELETE_AUDIT_TRAIL}/${data}`);
};
