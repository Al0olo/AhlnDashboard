import { createAsyncThunk } from "@reduxjs/toolkit";
import { postLogin } from "../../../helpers/fakebackend_helper";

export const LoginAction = createAsyncThunk("auth/login", async (user: any, thunkApi: any) => {
  try {
    let response: any = await postLogin(user);
    localStorage.setItem("authUser", JSON.stringify(response))
    localStorage.setItem("token", response?.token);

    return response;
  } catch (error: any) {
    console.log("LoginActionError", error);
    return thunkApi.rejectWithValue(error);
  }
}
);
