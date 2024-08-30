import { createSlice } from "@reduxjs/toolkit";
import {
  AssignRolePermissionAction,
  GetOneRoleOermissionAction,
  RevokeRolePermissionAction,
  GetRolePermissionsAction,
} from "./thunk";

export const initialState: any = {
  loading: true,
  error: {},
  rolePermissionsList: [],
  rolePermission: {},
};

const rolePermissionReducer = createSlice({
  name: "rolePermissionReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetRolePermissionsAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      GetRolePermissionsAction.fulfilled,
      (state, action: any) => {
        state.rolePermissionsList = action?.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      GetRolePermissionsAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );

    builder.addCase(AssignRolePermissionAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      AssignRolePermissionAction.fulfilled,
      (state, action: any) => {
        state.rolePermissionsList.push(action.payload);
        state.loading = false;
      }
    );
    builder.addCase(
      AssignRolePermissionAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );

    builder.addCase(RevokeRolePermissionAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      RevokeRolePermissionAction.fulfilled,
      (state, action: any) => {
        const deletedRolePermissionId = action.payload.role_id;
        state.rolePermissionsList = state.rolePermissionsList.filter(
          (rolePermission: any) =>
            rolePermission.role_id !== deletedRolePermissionId
        );
        state.loading = false;
      }
    );
    builder.addCase(
      RevokeRolePermissionAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );

    builder.addCase(GetOneRoleOermissionAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      GetOneRoleOermissionAction.fulfilled,
      (state, action: any) => {
        state.rolePermission = action?.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      GetOneRoleOermissionAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );
  },
});

export const rolePermissionSlices = rolePermissionReducer.reducer;
