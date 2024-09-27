import { createSlice } from "@reduxjs/toolkit";
import {
  DeleteSystemLogAction,
  GetSystemLogAction,
  GetOneSystemLogAction,
} from "./thunk";

export const initialState: any = {
  loading: true,
  error: {},
  systemLogList: [],
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
      state.systemLogList = action?.payload;
      state.loading = false;
    });
    builder.addCase(GetSystemLogAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(DeleteSystemLogAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(DeleteSystemLogAction.fulfilled, (state, action: any) => {
      const deletedSystemLogId = action.payload.id;
      state.systemLogList = state.systemLogList.filter(
        (systemLogList: any) => systemLogList.id !== deletedSystemLogId
      );
      state.loading = false;
    });
    builder.addCase(
      DeleteSystemLogAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );

    builder.addCase(GetOneSystemLogAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetOneSystemLogAction.fulfilled, (state, action: any) => {
      state.systemLogList = action?.payload;
      state.loading = false;
    });
    builder.addCase(
      GetOneSystemLogAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );
  },
});

export const systemLogSlices = systemLogReducer.reducer;
