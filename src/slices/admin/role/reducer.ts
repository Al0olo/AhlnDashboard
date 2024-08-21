import { createSlice } from "@reduxjs/toolkit";
import {
  AddRoleAction,
  DeleteRoleAction,
  GetOneRoleAction,
  GetRolesAction,
  UpdateRoleAction,
} from "./thunk";

export const initialState: any = {
  message: null,
  loading: true,
  spinner: false,
  data: null,
  success: false,
  error: false,
  roles: [],
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
      state.roles = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(GetRolesAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(AddRoleAction.pending, (state) => {
      state.spinner = true;
      state.error = false;
    });
    builder.addCase(AddRoleAction.fulfilled, (state, action: any) => {
      state.roles.push(action.payload);
      state.success = true;
      state.spinner = false;
    });
    builder.addCase(AddRoleAction.rejected, (state, { payload }: any) => {
      state.spinner = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(DeleteRoleAction.pending, (state) => {
      state.spinner = true;
      state.error = false;
    });
    builder.addCase(DeleteRoleAction.fulfilled, (state, action: any) => {
      const deletedRoleId = action.payload.id;
      state.roles = state.roles.filter(
        (role: any) => role.id !== deletedRoleId
      );
      state.success = true;
      state.spinner = false;
    });
    builder.addCase(DeleteRoleAction.rejected, (state, { payload }: any) => {
      state.spinner = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(GetOneRoleAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetOneRoleAction.fulfilled, (state, action: any) => {
      state.role = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(GetOneRoleAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(UpdateRoleAction.pending, (state) => {
      state.spinner = true;
      state.error = false;
    });
    builder.addCase(UpdateRoleAction.fulfilled, (state, action: any) => {
      state.roles = state.roles.map((role: any) =>
        role.id === action.payload.id ? { ...role, ...action.payload } : role
      );
    });
    builder.addCase(UpdateRoleAction.rejected, (state, { payload }: any) => {
      state.spinner = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export const roleSlices = roleReducer.reducer;
