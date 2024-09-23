import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  assignUserBox,
  // getOneUserBox,
  getUserBoxes,
  deleteUserBox,
  // updateUserBox,
} from "../../../helpers/backend_apis/box/userBox";

export const GetUserBoxesAction = createAsyncThunk(
  "userBox/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getUserBoxes();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

// export const GetOneUserBoxAction = createAsyncThunk(
//   "userBox/get-one",
//   async (userBox: any, thunkApi) => {
//     try {
//       const response = await getOneUserBox(userBox);
//       return response.data;
//     } catch (error: any) {
//       return thunkApi.rejectWithValue(error || error.message);
//     }
//   }
// );

export const AssignUserBoxAction = createAsyncThunk(
  "userBox/assign",
  async (userBox: any, thunkApi) => {
    try {
      const response = await assignUserBox(userBox);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

// export const UpdateUserBoxAction = createAsyncThunk(
//   "userBox/update",
//   async (data: any, thunkApi) => {
//     try {
//       const response = await updateUserBox(data);
//       return response.data;
//     } catch (error: any) {
//       return thunkApi.rejectWithValue(error || error.message);
//     }
//   }
// );

export const DeleteUserBoxAction = createAsyncThunk(
  "userBox/delete",
  async (userBox: string, thunkApi) => {
    try {
      const response = await deleteUserBox(userBox);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);
