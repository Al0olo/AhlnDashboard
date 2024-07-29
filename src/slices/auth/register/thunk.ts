//Include Both Helper File with needed methods
// import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { postFakeRegister } from "../../../helpers/fakebackend_helper";

// initialize relavant method of both Auth
// const fireBaseBackend: any = getFirebaseBackend();

export const SignupAction = createAsyncThunk(
  "auth/signup",
  async (user: any, thunkApi: any) => {
    try {
      let response = await postFakeRegister(user);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
