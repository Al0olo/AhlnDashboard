import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  assignRolePermission,
  getOneRolePermission,
  getRolePermissions,
  revokeRolePermission,
} from "../../../helpers/backend_apis/userManagement/rolePermission";

export const GetRolePermissionsAction = createAsyncThunk(
  "rolePermission/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getRolePermissions();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const GetOneRoleOermissionAction = createAsyncThunk(
  "rolePermission/get-one",
  async (rolePermission: any, thunkApi) => {
    try {
      const response = await getOneRolePermission(rolePermission);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const AssignRolePermissionAction = createAsyncThunk(
  "rolePermission/assign",
  async (rolePermission: any, thunkApi) => {
    try {
      const response = await assignRolePermission(rolePermission);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const RevokeRolePermissionAction = createAsyncThunk(
  "rolePermission/revoke",
  async (rolePermission: string, thunkApi) => {
    try {
      const response = await revokeRolePermission(rolePermission);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);
