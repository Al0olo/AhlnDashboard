import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBoxes,
  addBox,
  deleteBox,
  updateBox,
  getOneBox,
} from "../../../helpers/fakebackend_helper";

export const GetBoxesAction = createAsyncThunk(
  "box/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getBoxes();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const GetOneBoxAction = createAsyncThunk(
  "box/get-one",
  async (box: any, thunkApi) => {
    try {
      const response = await getOneBox(box);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const AddBoxAction = createAsyncThunk(
  "box/new",
  async (box: any, thunkApi) => {
    try {
      const response = await addBox(box);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const UpdateBoxAction = createAsyncThunk(
  "box/update",
  async (box: any, thunkApi) => {
    try {
      const response = await updateBox(box);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const DeleteBoxAction = createAsyncThunk(
  "box/delete",
  async (box: string, thunkApi) => {
    try {
      const response = await deleteBox(box);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);
