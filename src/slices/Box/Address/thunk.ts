import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAddresses,
  addAddress,
  deleteAddress,
  updateAddress,
  getOneAddress,
} from "../../../helpers/backend_apis/box/address";

export const GetAddressesAction = createAsyncThunk(
  "address/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getAddresses();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const GetOneAddressAction = createAsyncThunk(
  "address/get-one",
  async (address: any, thunkApi) => {
    try {
      const response = await getOneAddress(address);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const AddAddressAction = createAsyncThunk(
  "address/new",
  async (address: any, thunkApi) => {
    try {
      const response = await addAddress(address);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const UpdateAddressAction = createAsyncThunk(
  "address/update",
  async (address: any, thunkApi) => {
    try {
      const response = await updateAddress(address);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const DeleteAddressAction = createAsyncThunk(
  "address/delete",
  async (address: string, thunkApi) => {
    try {
      const response = await deleteAddress(address);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);
