import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addPermission,
  getOnePermission,
  getPermissions,
  deletePermission,
  updatePermission,
} from "../../../helpers/backend_apis/userManagement/permission";

export const GetPermissionsAction = createAsyncThunk(
  "permission/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getPermissions();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const GetOnePermissionAction = createAsyncThunk(
  "permission/get-one",
  async (permission: any, thunkApi) => {
    try {
      const response = await getOnePermission(permission);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const AddPermissionAction = createAsyncThunk(
  "permission/new",
  async (permission: any, thunkApi) => {
    try {
      const response = await addPermission(permission);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const UpdatePermissionAction = createAsyncThunk(
  "permission/update",
  async (permission: any, thunkApi) => {
    try {
      const response = await updatePermission(permission);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const DeletePermissionAction = createAsyncThunk(
  "permission/delete",
  async (permission: string, thunkApi) => {
    try {
      const response = await deletePermission(permission);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);
