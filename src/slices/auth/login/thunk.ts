import { createAsyncThunk } from "@reduxjs/toolkit";
import { postFakeLogin } from "../../../helpers/fakebackend_helper";

export const LoginAction = createAsyncThunk(
  "auth/login",
  async (user: any, thunkApi: any) => {
    try {
      let response = await postFakeLogin(user);
      console.log("response", response);
      return response;
    } catch (error) {
      console.log("error", error);

      return thunkApi.rejectWithValue(error);
    }
  }
);
