import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAddresses,
  addAddress,
  deleteAddress,
  updateAddress,
  getOneAddress,
} from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

export const GetAddressesAction = createAsyncThunk(
  "address/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getAddresses();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const GetOneAddressAction = createAsyncThunk(
  "address/get-one",
  async (address: any, thunkApi) => {
    try {
      const response = await getOneAddress(address);
      toast.success("Address Retrieved Successfully", { autoClose: 3000 });
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const AddAddressAction = createAsyncThunk(
  "address/new",
  async (address: any, thunkApi) => {
    try {
      const response = await addAddress(address);
      const data = await response;
      console.log("address", address);

      toast.success("Address Added Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const UpdateAddressAction = createAsyncThunk(
  "address/update",
  async (address: any, thunkApi) => {
    try {
      const response = await updateAddress(address);
      const data = await response;
      toast.success("Address Updated Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const DeleteAddressAction = createAsyncThunk(
  "address/delete",
  async (address: string, thunkApi) => {
    try {
      console.log("address", address);

      const response = await deleteAddress(address);
      const data = await response;
      toast.success("Address Deleted Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
