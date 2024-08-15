import { createSlice } from "@reduxjs/toolkit";
import {
  DeleteSystemLogAction,
  GetSystemLogAction,
  GetOneSystemLogAction,
} from "./thunk";

export const initialState: any = {
  systemLogError: null,
  message: null,
  loading: true,
  data: null,
  success: false,
  error: false,
  systemLog: [],
};

const systemLogReducer = createSlice({
  name: "systemLogReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetSystemLogAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetSystemLogAction.fulfilled, (state, action: any) => {
      state.data = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(GetSystemLogAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(DeleteSystemLogAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(DeleteSystemLogAction.fulfilled, (state, action: any) => {
      const deletedSystemLogId = action.payload.id;
      state.systemLog = state.systemLog.filter(
        (systemLog: any) => systemLog.id !== deletedSystemLogId
      );
      state.success = true;
      state.loading = false;
    });
    builder.addCase(
      DeleteSystemLogAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      }
    );

    builder.addCase(GetOneSystemLogAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetOneSystemLogAction.fulfilled, (state, action: any) => {
      state.systemLog = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(
      GetOneSystemLogAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      }
    );
  },
});

export const systemLogSlices = systemLogReducer.reducer;
