import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBoxImages } from "../../../helpers/backend_apis/box/boxImage";

export const GetBoxesImagesAction = createAsyncThunk(
  "boxImages/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getBoxImages();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);
