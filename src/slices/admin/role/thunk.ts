import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addRole,
  getOneRole,
  getRoles,
  deleteRole,
  updateRole,
} from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

export const GetRolesAction = createAsyncThunk(
  "role/get-all",
  async (_, thunkApi) => {
    try {
      const response = await getRoles();

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
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
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const AddRoleAction = createAsyncThunk(
  "role/new",
  async (role: any, thunkApi) => {
    try {
      const response = await addRole(role);
      const data = await response;

      toast.success("Role Added Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const UpdateRoleAction = createAsyncThunk(
  "role/update",
  async (role: any, thunkApi) => {
    try {
      const response = await updateRole(role);
      const data = await response;
      toast.success("Role Updated Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const DeleteRoleAction = createAsyncThunk(
  "role/delete",
  async (role: string, thunkApi) => {
    try {
      const response = await deleteRole(role);
      const data = await response;
      toast.success("Role Deleted Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
