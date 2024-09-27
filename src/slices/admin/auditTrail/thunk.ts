import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuditTrailApi,
  deleteAuditTrailApi,
} from "../../../helpers/backend_apis/admin/auditTrail";

export const GetAuditTrailAction = createAsyncThunk(
  "auditTrail/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getAuditTrailApi();

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const DeleteAuditTrailAction = createAsyncThunk(
  "auditTrail/delete",
  async (auditTrail: string, thunkApi) => {
    try {
      const response = await deleteAuditTrailApi(auditTrail);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);
