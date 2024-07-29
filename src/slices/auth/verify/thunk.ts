//Include Both Helper File with needed methods
// import { getFirebaseBackend } from "../../../helpers/firebase_helper";

import { postFakeVerifyEmail } from "../../../helpers/fakebackend_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const fireBaseBackend : any= getFirebaseBackend();

export const VerifyEmailAction = createAsyncThunk(
  "auth/verify",
  async (user: any, thunkApi: any) => {
    try {
      let response = await postFakeVerifyEmail(user);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
