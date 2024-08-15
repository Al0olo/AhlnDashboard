import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTablet,
  getOneTablet,
  getTablets,
  deleteTablet,
  updateTablet,
} from "../../../helpers/fakebackend_helper";

export const GetTabletsAction = createAsyncThunk(
  "tablet/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getTablets();

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
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
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const AddTabletAction = createAsyncThunk(
  "tablet/new",
  async (tablet: any, thunkApi) => {
    try {
      const response = await addTablet(tablet);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const UpdateTabletAction = createAsyncThunk(
  "tablet/update",
  async (tablet: any, thunkApi) => {
    try {
      const response = await updateTablet(tablet);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const DeleteTabletAction = createAsyncThunk(
  "tablet/delete",
  async (tablet: string, thunkApi) => {
    try {
      const response = await deleteTablet(tablet);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);
