import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDeliveryPackages,
  getOneDeliveryPackage,
} from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

export const GetDeliveryPackagesAction = createAsyncThunk(
  "delivery/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getDeliveryPackages();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const GetOneDeliveryPackagAction = createAsyncThunk(
  "delivery/get-one",
  async (delivery: any, thunkApi) => {
    try {
      const response = await getOneDeliveryPackage(delivery);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
