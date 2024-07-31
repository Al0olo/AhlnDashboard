import { createSlice } from "@reduxjs/toolkit";
import { VerifyEmailAction } from "./thunk";

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
    builder.addCase(VerifyEmailAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(VerifyEmailAction.fulfilled, (state, action: any) => {
      state.user = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(VerifyEmailAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export const verifySlices = verifyReducer.reducer;
