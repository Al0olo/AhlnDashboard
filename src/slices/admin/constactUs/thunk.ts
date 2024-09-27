import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOneContactUsApi,
  getContactUsApi,
  deleteContactUsApi,
} from "../../../helpers/backend_apis/admin/contactUs";

export const GetContactUsAction = createAsyncThunk(
  "contactUs/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getContactUsApi();

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const GetOneContactUsAction = createAsyncThunk(
  "contactUs/get-one",
  async (contactUs: any, thunkApi) => {
    try {
      const response = await getOneContactUsApi(contactUs);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const DeleteContactUsAction = createAsyncThunk(
  "contactUs/delete",
  async (contactUs: string, thunkApi) => {
    try {
      const response = await deleteContactUsApi(contactUs);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);
