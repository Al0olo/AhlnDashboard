import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LogoutAction } from "./thunk";

interface AuthState {
  loginError: string | null;
  message: string | null;
  loading: boolean;
  user: any;
  success: boolean;
  error: any;
  isUserLogout: boolean;
}

export const initialState: AuthState = {
  loginError: null,
  message: null,
  loading: false,
  user: null,
  success: false,
  error: null,
  isUserLogout: false,
};

const authReducer = createSlice({
  name: "authReducers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LogoutAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      LogoutAction.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.user = null;
        state.success = true;
        state.loading = false;
        state.isUserLogout = true;
      }
    );
    builder.addCase(
      LogoutAction.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.isUserLogout = false;
      }
    );
  },
});

export const authSlices = authReducer.reducer;
