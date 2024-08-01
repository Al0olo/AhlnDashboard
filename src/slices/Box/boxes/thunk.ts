import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBoxes, addBox } from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

export const GetBoxAction = createAsyncThunk(
  "box/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getBoxes();
      console.log("Response", response);
      console.log("Response Data", response.data);

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
