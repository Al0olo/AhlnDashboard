import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOneSystemLogApi,
  getSystemLogApi,
  deleteSystemLogApi,
} from "../../../helpers/backend_apis/admin/systemLog";

export const GetSystemLogAction = createAsyncThunk(
  "systemLog/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getSystemLogApi();

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const GetOneSystemLogAction = createAsyncThunk(
  "systemLog/get-one",
  async (systemLog: any, thunkApi) => {
    try {
      const response = await getOneSystemLogApi(systemLog);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const DeleteSystemLogAction = createAsyncThunk(
  "systemLog/delete",
  async (systemLog: string, thunkApi) => {
    try {
      const response = await deleteSystemLogApi(systemLog);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);
