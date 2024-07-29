//Include Both Helper File with needed methods
// import { getFirebaseBackend } from "../../../helpers/firebase_helper";

import { postFakeResetPwd } from "../../../helpers/fakebackend_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const fireBaseBackend : any= getFirebaseBackend();

export const VerifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (user: any, thunkApi: any) => {
    try {
      let response = await postFakeResetPwd(user);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
