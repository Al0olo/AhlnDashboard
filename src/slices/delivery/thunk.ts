import { createAsyncThunk } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";

import {
  getShippingCompanies as getShippingCompaniesApi,
  addShippingCompany as addNewShippingCompanyApi,
  updateShippingCompany as updateShippingCompanyApi,
  deleteShippingCompany as deleteShippingCompanyApi,
  getDeliveryPackages as getDeliveryPackagesApi,
  getOneDeliveryPackage as getOneDeliveryPackageApi,
} from "../../helpers/backend_apis/delivery";

// ShippingCompanies For Admin
export const getShippingCompanies = createAsyncThunk(
  "shippingCompanies/getShippingCompanies",
  async (_, thunkApi) => {
    try {
      const response = await getShippingCompaniesApi();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const addShippingCompany = createAsyncThunk(
  "shippingCompanies/addShippingCompany",
  async (user: any, thunkApi) => {
    try {
      const response = await addNewShippingCompanyApi(user);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const updateShippingCompany = createAsyncThunk(
  "shippingCompanies/updateShippingCompany",
  async (user: any, thunkApi) => {
    try {
      const response = await updateShippingCompanyApi(user);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const deleteShippingCompany = createAsyncThunk(
  "shippingCompanies/deleteShippingCompany",
  async (user: any, thunkApi) => {
    try {
      const response = await deleteShippingCompanyApi(user);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const getDeliveryPackages = createAsyncThunk(
  "delivery/getDeliveryPackages",
  async (_, thunkApi) => {
    try {
      const response = await getDeliveryPackagesApi();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const getOneDeliveryPackage = createAsyncThunk(
  "delivery/getOneDeliveryPackage",
  async (delivery: any, thunkApi) => {
    try {
      const response = await getOneDeliveryPackageApi(delivery);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);
