import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTablet,
  getOneTablet,
  getTablets,
  deleteTablet,
  updateTablet,
} from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

export const GetTabletsAction = createAsyncThunk(
  "tablet/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getTablets();

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const GetOneTabletAction = createAsyncThunk(
  "tablet/get-one",
  async (tablet: any, thunkApi) => {
    try {
      const response = await getOneTablet(tablet);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const AddTabletAction = createAsyncThunk(
  "tablet/new",
  async (tablet: any, thunkApi) => {
    try {
      const response = await addTablet(tablet);
      const data = await response;

      toast.success("Tablet Added Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const UpdateTabletAction = createAsyncThunk(
  "tablet/update",
  async (tablet: any, thunkApi) => {
    try {
      const response = await updateTablet(tablet);
      const data = await response;
      toast.success("Tablet Updated Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const DeleteTabletAction = createAsyncThunk(
  "tablet/delete",
  async (tablet: string, thunkApi) => {
    try {

      const response = await deleteTablet(tablet);
      const data = await response;
      toast.success("Tablet Deleted Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
