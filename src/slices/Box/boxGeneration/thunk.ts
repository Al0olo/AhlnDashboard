import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addBoxGeneration,
  getOneBoxGeneration,
  getBoxGenerations,
  deleteBoxGeneration,
  updateBoxGeneration,
  updateHasOutSideCameraApi,
  updateHasInSideCameraApi,
  updateHasTabletApi,
} from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

export const GetBoxGenerationsAction = createAsyncThunk(
  "boxGeneration/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getBoxGenerations();

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const updateHasOutSideCamera = createAsyncThunk(
  "boxGeneration/updateHasOutSideCameraStatus",
  async (data: any, thunkApi) => {
    try {
      const response = updateHasOutSideCameraApi(data);
      const result = await response;
      toast.success("Outside Camera Status Updateded Successfully", {
        autoClose: 3000,
      });
      return result;
    } catch (error: any) {
      toast.error("Outside Camera Status Updateded Failed", {
        autoClose: 3000,
      });
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const updateHasInSideCamera = createAsyncThunk(
  "boxGeneration/updateHasInSideCameraStatus",
  async (data: any, thunkApi) => {
    try {
      const response = updateHasInSideCameraApi(data);
      const result = await response;
      toast.success("Inside Camera Status Updateded Successfully", {
        autoClose: 3000,
      });
      return result;
    } catch (error: any) {
      toast.error("Inside Camera Status Updateded Failed", {
        autoClose: 3000,
      });
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const updateHasTablet = createAsyncThunk(
  "boxGeneration/updateHasTabletStatus",
  async (data: any, thunkApi) => {
    try {
      const response = updateHasTabletApi(data);
      const result = await response;
      toast.success("Tablet Status Updateded Successfully", {
        autoClose: 3000,
      });
      return result;
    } catch (error: any) {
      toast.error("Tablet Status Updateded Failed", {
        autoClose: 3000,
      });
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const GetOneBoxGenerationAction = createAsyncThunk(
  "boxGeneration/get-one",
  async (boxGeneration: any, thunkApi) => {
    try {
      const response = await getOneBoxGeneration(boxGeneration);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const AddBoxGenerationAction = createAsyncThunk(
  "boxGeneration/new",
  async (boxGeneration: any, thunkApi) => {
    try {
      const response = await addBoxGeneration(boxGeneration);
      const data = await response;

      toast.success("BoxGeneration Added Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const UpdateBoxGenerationAction = createAsyncThunk(
  "boxGeneration/update",
  async (boxGeneration: any, thunkApi) => {
    try {
      const response = await updateBoxGeneration(boxGeneration);
      const data = await response;
      toast.success("BoxGeneration Updated Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const DeleteBoxGenerationAction = createAsyncThunk(
  "boxGeneration/delete",
  async (boxGeneration: string, thunkApi) => {
    try {
      const response = await deleteBoxGeneration(boxGeneration);
      const data = await response;
      toast.success("BoxGeneration Deleted Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
