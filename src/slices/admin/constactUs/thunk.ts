import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOneContactUsApi,
  getContactUsApi,
  deleteContactUsApi,
} from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

export const GetContactUsAction = createAsyncThunk(
  "contactUs/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getContactUsApi();

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const GetOneContactUsAction = createAsyncThunk(
  "contactUs/get-one",
  async (contactUs: any, thunkApi) => {
    try {
      const response = await getOneContactUsApi(contactUs);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const DeleteContactUsAction = createAsyncThunk(
  "contactUs/delete",
  async (contactUs: string, thunkApi) => {
    try {
      const response = await deleteContactUsApi(contactUs);
      const data = response;
      toast.success("Contact Us Deleted Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
