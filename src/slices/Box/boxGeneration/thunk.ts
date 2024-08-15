import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addBoxGeneration,
  getOneBoxGeneration,
  getBoxGenerations,
  deleteBoxGeneration,
  updateBoxGeneration,
} from "../../../helpers/fakebackend_helper";

export const GetBoxGenerationsAction = createAsyncThunk(
  "boxGeneration/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getBoxGenerations();

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
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
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const AddBoxGenerationAction = createAsyncThunk(
  "boxGeneration/new",
  async (boxGeneration: any, thunkApi) => {
    try {
      const response = await addBoxGeneration(boxGeneration);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const UpdateBoxGenerationAction = createAsyncThunk(
  "boxGeneration/update",
  async (boxGeneration: any, thunkApi) => {
    try {
      const response = await updateBoxGeneration(boxGeneration);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const DeleteBoxGenerationAction = createAsyncThunk(
  "boxGeneration/delete",
  async (boxGeneration: string, thunkApi) => {
    try {
      const response = await deleteBoxGeneration(boxGeneration);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);
