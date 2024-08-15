import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getShippingCompanies,
  addShippingCompany,
  deleteShippingCompany,
  updateShippingCompany,
  getOneShippingCompany,
} from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

export const GetShippingCompaniesAction = createAsyncThunk(
  "shippingCompanies/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getShippingCompanies();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const GetOneShippingCompanyAction = createAsyncThunk(
  "shippingCompanies/get-one",
  async (shippingCompanies: any, thunkApi) => {
    try {
      const response = await getOneShippingCompany(shippingCompanies);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const AddShippingCompanyAction = createAsyncThunk(
  "shippingCompanies/new",
  async (shippingCompanies: any, thunkApi) => {
    try {
      const response = await addShippingCompany(shippingCompanies);
      const data = await response;
      toast.success("ShippingCompany Added Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const UpdateShippingCompanyAction = createAsyncThunk(
  "shippingCompanies/update",
  async (shippingCompanies: any, thunkApi) => {
    try {
      const response = await updateShippingCompany(shippingCompanies);
      const data = await response;
      toast.success("ShippingCompany Updated Successfully", {
        autoClose: 3000,
      });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const DeleteShippingCompanyAction = createAsyncThunk(
  "shippingCompanies/delete",
  async (shippingCompanies: string, thunkApi) => {
    try {
      const response = await deleteShippingCompany(shippingCompanies);
      const data = await response;
      toast.success("ShippingCompany Deleted Successfully", {
        autoClose: 3000,
      });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
