import { createSlice } from "@reduxjs/toolkit";
import {
  AssignUserPermissionAction,
  RevokeUserPermissionAction,
  GetUserPermissionsAction,
} from "./thunk";

export const initialState: any = {
  loading: true,
  error: {},
  userPermissionsList: [],
  userPermission: {},
};

const userPermissionReducer = createSlice({
  name: "userPermissionReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetUserPermissionsAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      GetUserPermissionsAction.fulfilled,
      (state, action: any) => {
        state.userPermissionsList = action?.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      GetUserPermissionsAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );

    builder.addCase(AssignUserPermissionAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      AssignUserPermissionAction.fulfilled,
      (state, action: any) => {
        state.userPermissionsList.push(action.payload);
        state.loading = false;
      }
    );
    builder.addCase(
      AssignUserPermissionAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );

    builder.addCase(RevokeUserPermissionAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      RevokeUserPermissionAction.fulfilled,
      (state, action: any) => {
        const deletedUserPermissionId = action.payload.user_id;
        state.userPermissionsList = state.userPermissionsList.filter(
          (userPermission: any) =>
            userPermission.user_id !== deletedUserPermissionId
        );
        state.loading = false;
      }
    );
    builder.addCase(
      RevokeUserPermissionAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );
  },
});

export const userPermissionSlices = userPermissionReducer.reducer;
