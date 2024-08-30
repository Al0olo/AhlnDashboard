import { createSlice } from "@reduxjs/toolkit";
import {
  AddPermissionAction,
  DeletePermissionAction,
  GetOnePermissionAction,
  GetPermissionsAction,
  UpdatePermissionAction,
} from "./thunk";

export const initialState: any = {
  loading: true,
  error: {},
  permissionsList: [],
  permission: {},
};

const permissionReducer = createSlice({
  name: "permissionReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetPermissionsAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetPermissionsAction.fulfilled, (state, action: any) => {
      state.permissionsList = action?.payload;
      state.loading = false;
    });
    builder.addCase(
      GetPermissionsAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );

    builder.addCase(AddPermissionAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(AddPermissionAction.fulfilled, (state, action: any) => {
      state.permissionsList.push(action.payload);
      state.loading = false;
    });
    builder.addCase(AddPermissionAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(DeletePermissionAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(DeletePermissionAction.fulfilled, (state, action: any) => {
      const deletedPermissionId = action.payload.id;
      state.permissionsList = state.permissionsList.filter(
        (permission: any) => permission.id !== deletedPermissionId
      );
      state.loading = false;
    });
    builder.addCase(
      DeletePermissionAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );

    builder.addCase(GetOnePermissionAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetOnePermissionAction.fulfilled, (state, action: any) => {
      state.permission = action?.payload;
      state.loading = false;
    });
    builder.addCase(
      GetOnePermissionAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );

    builder.addCase(UpdatePermissionAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(UpdatePermissionAction.fulfilled, (state, action: any) => {
      const updatedPermission = action.payload;
      const index = state.permissionsList.findIndex(
        (permission: any) => permission.id === updatedPermission.id
      );
      state.permissionsList[index] = updatedPermission;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(
      UpdatePermissionAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );
  },
});

export const permissionSlices = permissionReducer.reducer;
