import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOneAuditTrailApi,
  getAuditTrailApi,
  deleteAuditTrailApi,
} from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

export const GetAuditTrailAction = createAsyncThunk(
  "auditTrail/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getAuditTrailApi();

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const GetOneAuditTrailAction = createAsyncThunk(
  "auditTrail/get-one",
  async (auditTrail: any, thunkApi) => {
    try {
      const response = await getOneAuditTrailApi(auditTrail);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const DeleteAuditTrailAction = createAsyncThunk(
  "auditTrail/delete",
  async (auditTrail: string, thunkApi) => {
    try {
      const response = await deleteAuditTrailApi(auditTrail);
      const data = response;
      toast.success("Audit Trail Deleted Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
