import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBoxes } from "../../helpers/fakebackend_helper";

export const BoxAction = createAsyncThunk(
  "box/get-all",
  async (thunkApi: any) => {
    try {
      let response = await getBoxes();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
