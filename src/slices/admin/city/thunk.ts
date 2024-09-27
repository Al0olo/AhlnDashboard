import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCityApi,
  deleteCityApi,
  getCityApi,
  getCityInCountryApi,
  updateCityApi,
} from "../../../helpers/backend_apis/admin/city";

export const GetCityAction = createAsyncThunk(
  "city/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getCityApi();

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const GetCityInCountryAction = createAsyncThunk(
  "city/get-all-in-country",
  async (data: any, thunkApi) => {
    try {
      const response = await getCityInCountryApi(data);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const AddCityAction = createAsyncThunk(
  "city/new",
  async (city: any, thunkApi) => {
    try {
      const response = await addCityApi(city);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const UpdateCityAction = createAsyncThunk(
  "city/update",
  async (data: any, thunkApi) => {
    try {
      const response = await updateCityApi(data);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const DeleteCityAction = createAsyncThunk(
  "city/delete",
  async (city: string, thunkApi) => {
    try {
      const response = await deleteCityApi(city);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);
