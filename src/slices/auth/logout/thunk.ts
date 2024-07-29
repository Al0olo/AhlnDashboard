import { createAsyncThunk } from "@reduxjs/toolkit";
import { postFakeLogout } from "../../../helpers/fakebackend_helper";

interface LogoutResponse {
  success: boolean;
  message: string;
  data: null;
}

export const LogoutAction = createAsyncThunk<
  LogoutResponse,
  void,
  { rejectValue: any }
>("auth/logout", async (_, thunkApi) => {
  try {
    let response = await postFakeLogout();
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return thunkApi.rejectWithValue(error.response.data);
    } else {
      return thunkApi.rejectWithValue({ message: "Network error" });
    }
  }
});
