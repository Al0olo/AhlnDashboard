import { createAsyncThunk } from "@reduxjs/toolkit";

export const LogoutAction = createAsyncThunk("auth/logout", async (args, thunkApi) => {
  try {
    localStorage.removeItem("authUser");

    // let response = await postFakeLogout();
    return null;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error);

  }
});
