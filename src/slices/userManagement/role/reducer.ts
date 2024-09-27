import { createSlice } from "@reduxjs/toolkit";
import {
  AddRoleAction,
  DeleteRoleAction,
  GetOneRoleAction,
  GetRolesAction,
  UpdateRoleAction,
} from "./thunk";

export const initialState: any = {
  loading: true,
  error: {},
  rolesList: [],
  role: {},
};

const roleReducer = createSlice({
  name: "roleReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetRolesAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetRolesAction.fulfilled, (state, action: any) => {
      state.rolesList = action?.payload;
      state.loading = false;
    });
    builder.addCase(GetRolesAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(AddRoleAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(AddRoleAction.fulfilled, (state, action: any) => {
      state.rolesList.push(action.payload);
      state.loading = false;
    });
    builder.addCase(AddRoleAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(DeleteRoleAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(DeleteRoleAction.fulfilled, (state, action: any) => {
      const deletedRoleId = action.payload.id;
      state.rolesList = state.rolesList.filter(
        (role: any) => role.id !== deletedRoleId
      );
      state.loading = false;
    });
    builder.addCase(DeleteRoleAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(GetOneRoleAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetOneRoleAction.fulfilled, (state, action: any) => {
      state.role = action?.payload;
      state.loading = false;
    });
    builder.addCase(GetOneRoleAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(UpdateRoleAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(UpdateRoleAction.fulfilled, (state, action: any) => {
      const updatedRole = action.payload;
      const index = state.rolesList.findIndex(
        (role: any) => role.id === updatedRole.id
      );
      state.rolesList[index] = updatedRole;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(UpdateRoleAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const roleSlices = roleReducer.reducer;
