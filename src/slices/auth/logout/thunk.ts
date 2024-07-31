import { createAsyncThunk } from "@reduxjs/toolkit";
import { postFakeLogout } from "../../../helpers/fakebackend_helper";

export const LogoutAction = createAsyncThunk("auth/logout", async () => {
  try {
    let response = await postFakeLogout();
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return error({ message: "Network error" });
    }
  }
});
