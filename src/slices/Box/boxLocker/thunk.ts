import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteBoxLocker,
  getBoxLockers,
  updateBoxLocker,
} from "../../../helpers/backend_apis/box/boxLocker";

export const GetBoxLockersAction = createAsyncThunk(
  "boxLocker/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getBoxLockers();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const UpdateBoxLockerAction = createAsyncThunk(
  "boxLocker/update",
  async (boxLocker: any, thunkApi) => {
    try {
      const response = await updateBoxLocker(boxLocker);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const DeleteBoxLockerAction = createAsyncThunk(
  "boxLocker/delete",
  async (boxLocker: string, thunkApi) => {
    try {
      const response = await deleteBoxLocker(boxLocker);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);
