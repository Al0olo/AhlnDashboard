import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  assignUserBox,
  getOneUserBox,
  getUserBoxes,
  deleteUserBox,
  updateUserBox,
  updateUserBoxStatusApi,
} from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

export const GetUserBoxesAction = createAsyncThunk(
  "userBox/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getUserBoxes();

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const updateUserBoxStatus = createAsyncThunk(
  "userBox/updateStatus",
  async (data: any, thunkApi) => {
    try {
      const response = updateUserBoxStatusApi(data);
      const result = await response;
      toast.success("User Box Status Updateded Successfully", {
        autoClose: 3000,
      });
      return result;
    } catch (error: any) {
      toast.error("User Box Status Updateded Failed", { autoClose: 3000 });
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const GetOneUserBoxAction = createAsyncThunk(
  "userBox/get-one",
  async (userBox: any, thunkApi) => {
    try {
      const response = await getOneUserBox(userBox);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const AssignUserBoxAction = createAsyncThunk(
  "userBox/assign",
  async (userBox: any, thunkApi) => {
    try {
      const response = assignUserBox(userBox);
      const data = await response;

      toast.success("User Box Assigned Successfully To User", {
        autoClose: 3000,
      });
      return data;
    } catch (error: any) {
      toast.error(error.payload?.message, { autoClose: 3000 });
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const UpdateUserBoxAction = createAsyncThunk(
  "userBox/update",
  async (userBox: any, thunkApi) => {
    try {
      const response = updateUserBox(userBox);
      const data = await response;
      toast.success("User Box Updated Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      toast.error(error.response?.message, { autoClose: 3000 });
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const DeleteUserBoxAction = createAsyncThunk(
  "userBox/delete",
  async (userBox: string, thunkApi) => {
    try {
      const response = await deleteUserBox(userBox);
      const data = response;
      toast.success("User Box Deleted Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
