import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRelativeCustomer,
  updateRelativeCustomerStatusApi,
} from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

export const GetRelativeCustomerAction = createAsyncThunk(
  "relativeCustomer/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getRelativeCustomer();

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateRelativeCustomerStatus = createAsyncThunk(
  "relativeCustomer/updateStatus",
  async (data: any, thunkApi) => {
    try {
      const response = await updateRelativeCustomerStatusApi(data);
      const result = response;
      toast.success("Customer Status Updateded Successfully", {
        autoClose: 3000,
      });

      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
