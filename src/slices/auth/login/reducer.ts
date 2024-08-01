import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { LogoutAction } from "slices/thunks";
import { LoginAction } from "./thunk";

export const initialState: any = {
  loginError: null,
  message: null,
  loading: false,
  user: null,
  success: false,
  error: false,
};

const loginReducer = createSlice({
  name: "loginReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LoginAction.pending, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(LoginAction.fulfilled, (state, action: any) => {
      state.user = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(LoginAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });


    builder.addCase(
      LogoutAction.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.user = null;
        state.success = true;
        state.loading = false;
      }
    );
  },
});

export const loginSlices = loginReducer.reducer;
