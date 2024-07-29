import { createSlice } from "@reduxjs/toolkit";
import { ForgetPasswordAction } from "./thunk";

export const initialState = {
  forgotError: null,
  message: null,
  loading: false,
  user: null,
  success: false,
  error: false,
};

const forgotPasswordReducer = createSlice({
  name: "forgotpwd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ForgetPasswordAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(ForgetPasswordAction.fulfilled, (state, action: any) => {
      state.user = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(
      ForgetPasswordAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      }
    );
  },
});

export const forgotPasswordSlices = forgotPasswordReducer.reducer;
