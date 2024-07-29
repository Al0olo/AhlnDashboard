import { createSlice } from "@reduxjs/toolkit";
import { VerifyOtp } from "./thunk";

export const initialState = {
  verifyError: null,
  message: null,
  loading: false,
  user: null,
  success: false,
  error: false,
};

const verifyReducer = createSlice({
  name: "verifyReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(VerifyOtp.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(VerifyOtp.fulfilled, (state, action: any) => {
      state.user = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(VerifyOtp.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export const verifySlices = verifyReducer.reducer;
