// import { userForgetPasswordSuccess, userForgetPasswordError } from "./reducer";

//Include Both Helper File with needed methods
// import { getFirebaseBackend } from "../../../helpers/firebase_helper";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { postFakeForgetPwd } from "../../../helpers/fakebackend_helper";

// const fireBaseBackend : any= getFirebaseBackend();

export const ForgetPasswordAction = createAsyncThunk(
  "auth/forgetpwd",
  async (user: any, thunkApi: any) => {
    try {
      let response = await postFakeForgetPwd(user);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
