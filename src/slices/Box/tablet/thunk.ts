import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTablets } from "../../../helpers/fakebackend_helper";

export const TabletAction = createAsyncThunk(
  "tablet/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getTablets();
      console.log("Response", response);
      console.log("Response Data", response.data);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
