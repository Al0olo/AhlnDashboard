import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBoxImages } from "../../../helpers/fakebackend_helper";

export const GetBoxesImagesAction = createAsyncThunk(
  "boxImages/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getBoxImages();

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
