import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addRole,
  getOneRole,
  getRoles,
  deleteRole,
  updateRole,
} from "../../../helpers/backend_apis/userManagement/role";

export const GetRolesAction = createAsyncThunk(
  "role/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getRoles();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const GetOneRoleAction = createAsyncThunk(
  "role/get-one",
  async (role: any, thunkApi) => {
    try {
      const response = await getOneRole(role);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const AddRoleAction = createAsyncThunk(
  "role/new",
  async (role: any, thunkApi) => {
    try {
      const response = await addRole(role);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const UpdateRoleAction = createAsyncThunk(
  "role/update",
  async (role: any, thunkApi) => {
    try {
      const response = await updateRole(role);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const DeleteRoleAction = createAsyncThunk(
  "role/delete",
  async (role: string, thunkApi) => {
    try {
      const response = await deleteRole(role);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);
