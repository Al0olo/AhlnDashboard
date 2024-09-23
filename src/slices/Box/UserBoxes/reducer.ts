import { createSlice } from "@reduxjs/toolkit";
import {
  AssignUserBoxAction,
  DeleteUserBoxAction,
  GetUserBoxesAction,
} from "./thunk";

export const initialState: any = {
  userBoxesList: [],
  loading: true,
  error: {},
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
      state.userBoxesList = action?.payload;
      state.loading = false;
    });
    builder.addCase(GetUserBoxesAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(AssignUserBoxAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(AssignUserBoxAction.fulfilled, (state, action: any) => {
      state.userBoxesList.push(action.payload);
      state.loading = false;
    });
    builder.addCase(AssignUserBoxAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(DeleteUserBoxAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(DeleteUserBoxAction.fulfilled, (state, action: any) => {
      const deletedUserBoxId = action.payload.id;
      state.userBoxesList = state.userBoxesList.filter(
        (userBox: any) => userBox.user_box_id !== deletedUserBoxId
      );
      state.loading = false;
    });
    builder.addCase(DeleteUserBoxAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    // builder.addCase(GetOneUserBoxAction.pending, (state) => {
    //   state.loading = true;
    //   state.error = false;
    // });
    // builder.addCase(GetOneUserBoxAction.fulfilled, (state, action: any) => {
    //   state.userBoxesList = action?.payload;
    //   state.loading = false;
    // });
    // builder.addCase(GetOneUserBoxAction.rejected, (state, { payload }: any) => {
    //   state.loading = false;
    //   state.error = payload;
    // });

    // builder.addCase(UpdateUserBoxAction.pending, (state) => {
    //   state.loading = true;
    //   state.error = false;
    // });
    // builder.addCase(UpdateUserBoxAction.fulfilled, (state, action: any) => {
    //   const updatedUserBox = action?.payload;
    //   const index = state.userBoxesList.findIndex(
    //     (userBox: any) => userBox.id === updatedUserBox.id
    //   );
    //   state.userBoxesList[index] = updatedUserBox;
    //   state.loading = false;
    // });
    // builder.addCase(UpdateUserBoxAction.rejected, (state, { payload }: any) => {
    //   state.loading = false;
    //   state.error = payload;
    // });
  },
});

export const userBoxSlices = userBoxReducer.reducer;
