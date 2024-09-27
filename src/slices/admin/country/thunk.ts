import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCountryApi,
  deleteCountryApi,
  getCountryApi,
  updateCountryApi,
} from "../../../helpers/backend_apis/admin/country";

export const GetCountryAction = createAsyncThunk(
  "country/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getCountryApi();

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const AddCountryAction = createAsyncThunk(
  "country/new",
  async (country: any, thunkApi) => {
    try {
      const response = await addCountryApi(country);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const UpdateCountryAction = createAsyncThunk(
  "country/update",
  async (data: any, thunkApi) => {
    try {
      const response = await updateCountryApi(data);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const DeleteCountryAction = createAsyncThunk(
  "country/delete",
  async (country: string, thunkApi) => {
    try {
      const response = await deleteCountryApi(country);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);
