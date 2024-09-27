import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  assignUserPermission,
  getOneUserPermission,
  getUserPermissions,
  revokeUserPermission,
} from "../../../helpers/backend_apis/userManagement/userPermission";

export const GetUserPermissionsAction = createAsyncThunk(
  "userPermission/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getUserPermissions();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const AssignUserPermissionAction = createAsyncThunk(
  "userPermission/assign",
  async (userPermission: any, thunkApi) => {
    try {
      const response = await assignUserPermission(userPermission);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const RevokeUserPermissionAction = createAsyncThunk(
  "userPermission/revoke",
  async (userPermission: string, thunkApi) => {
    try {
      const response = await revokeUserPermission(userPermission);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);
