import { createAsyncThunk } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";

import {
  getUsers as getUsersApi,
  addUser as addNewUserApi,
  updateUser as updateUserApi,
  deleteUser as deleteUserApi,
  getCustomers as getCustomersApi,
  addCustomer as addNewCustomerApi,
  updateCustomer as updateCustomerApi,
  deleteCustomer as deleteCustomerApi,
  getRelativeCustomers as getRelativeCustomersApi,
} from "../../helpers/backend_apis/users";

// Users For Admin
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, thunkApi) => {
    try {
      const response = await getUsersApi();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user: any, thunkApi) => {
    try {
      const response = await addNewUserApi(user);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user: any, thunkApi) => {
    try {
      const response = await updateUserApi(user);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (user: any, thunkApi) => {
    try {
      const response = await deleteUserApi(user);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const getCustomers = createAsyncThunk(
  "users/getCustomers",
  async (_, thunkApi) => {
    try {
      const response = await getCustomersApi();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const addCustomer = createAsyncThunk(
  "users/addCustomer",
  async (customer: any, thunkApi) => {
    try {
      const response = await addNewCustomerApi(customer);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "users/updateCustomer",
  async (customer: any, thunkApi) => {
    try {
      const response = await updateCustomerApi(customer);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "users/deleteCustomer",
  async (customer: any, thunkApi) => {
    try {
      const response = await deleteCustomerApi(customer);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);

export const getRelativeCustomers = createAsyncThunk(
  "users/getRelativeCustomers",
  async (_, thunkApi) => {
    try {
      const response = await getRelativeCustomersApi();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error || error.message);
    }
  }
);
