import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOneSystemLogApi,
  getSystemLogApi,
  deleteSystemLogApi,
} from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

export const GetSystemLogAction = createAsyncThunk(
  "systemLog/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getSystemLogApi();

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
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
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const DeleteSystemLogAction = createAsyncThunk(
  "systemLog/delete",
  async (systemLog: string, thunkApi) => {
    try {
      const response = await deleteSystemLogApi(systemLog);
      const data = response;
      toast.success("Audit Trail Deleted Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
