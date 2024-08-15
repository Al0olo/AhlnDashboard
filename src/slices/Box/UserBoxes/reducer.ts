import { createSlice } from "@reduxjs/toolkit";
import {
  AssignUserBoxAction,
  DeleteUserBoxAction,
  GetOneUserBoxAction,
  GetUserBoxesAction,
  UpdateUserBoxAction,
} from "./thunk";

export const initialState: any = {
  userBoxError: null,
  message: null,
  loading: true,
  data: null,
  success: false,
  error: false,
  userBoxs: [],
};

const userBoxReducer = createSlice({
  name: "userBoxReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetUserBoxesAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetUserBoxesAction.fulfilled, (state, action: any) => {
      state.data = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(GetUserBoxesAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(AssignUserBoxAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(AssignUserBoxAction.fulfilled, (state, action: any) => {
      state.userBoxs.push(action.payload);
      state.success = true;
      state.loading = false;
    });
    builder.addCase(AssignUserBoxAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(DeleteUserBoxAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(DeleteUserBoxAction.fulfilled, (state, action: any) => {
      const deletedUserBoxId = action.payload.id;
      state.userBoxs = state.userBoxs.filter(
        (userBox: any) => userBox.id !== deletedUserBoxId
      );
      state.success = true;
      state.loading = false;
    });
    builder.addCase(DeleteUserBoxAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(GetOneUserBoxAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetOneUserBoxAction.fulfilled, (state, action: any) => {
      state.userBox = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(GetOneUserBoxAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(UpdateUserBoxAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(UpdateUserBoxAction.fulfilled, (state, action: any) => {
      state.userBoxs = state.userBoxs.map((userBox: any) =>
        userBox.id === action.payload.id
          ? { ...userBox, ...action.payload }
          : userBox
      );
    });
    builder.addCase(UpdateUserBoxAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export const userBoxSlices = userBoxReducer.reducer;
