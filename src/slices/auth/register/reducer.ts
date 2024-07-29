import { createSlice } from "@reduxjs/toolkit";
import { SignupAction } from "./thunk";

export const initialState: any = {
  registrationError: null,
  message: null,
  loading: false,
  user: null,
  success: false,
  error: false,
};

const registerReducer = createSlice({
  name: "registerReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SignupAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(SignupAction.fulfilled, (state, action: any) => {
      state.user = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(SignupAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export const registerSlices = registerReducer.reducer;
