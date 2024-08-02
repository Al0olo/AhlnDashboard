import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBoxes,
  addBox,
  deleteBox,
  updateBox,
  getOneBox,
} from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

export const GetBoxesAction = createAsyncThunk(
  "box/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getBoxes();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const GetOneBoxAction = createAsyncThunk(
  "box/get-one",
  async (box: any, thunkApi) => {
    try {
      const response = await getOneBox(box);
      toast.success("Box Retrieved Successfully", { autoClose: 3000 });
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const AddBoxAction = createAsyncThunk(
  "box/new",
  async (box: any, thunkApi) => {
    try {
      const response = await addBox(box);
      const data = await response;
      toast.success("Box Added Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const UpdateBoxAction = createAsyncThunk(
  "box/update",
  async (box: any, thunkApi) => {
    try {
      const response = await updateBox(box);
      const data = await response;
      toast.success("Box Updated Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const DeleteBoxAction = createAsyncThunk(
  "box/delete",
  async (box: string, thunkApi) => {
    try {
      console.log("box", box);

      const response = await deleteBox(box);
      const data = await response;
      toast.success("Box Deleted Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
