import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  getModels as getModelsApi,
  getModel as getModelApi,
  deleteModels as deleteModelsApi,
  addNewModel as addNewModelApi,
  updateModel as updateModelApi,
  getProducts as getProductsApi,
  deleteProducts as deleteProductsApi,
  addNewProduct as addNewProductApi,
  updateProduct as updateProductApi,
  getOrders as getOrdersApi,
  getSellers as getSellersApi,
  getCustomers as getCustomersApi,
  updateOrder as updateOrderApi,
  deleteOrder as deleteOrderApi,
  addNewOrder as addNewOrderApi,
  addNewCustomer as addNewCustomerApi,
  updateCustomer as updateCustomerApi,
  deleteCustomer as deleteCustomerApi,
  updateUserStatusApi,
} from "../../helpers/fakebackend_helper";

//Models
export const getModels = createAsyncThunk(
  "ecommerce/getModels",
  async (_, thunkApi) => {
    try {
      let response = await getModelsApi();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getModel = createAsyncThunk(
  "ecommerce/getModel",
  async (id: any, thunkApi) => {
    try {
      let response = await getModelApi(id);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const deleteModels = createAsyncThunk(
  "ecommerce/deleteModels",
  async (model: any, thunkApi) => {
    try {
      const response = deleteModelsApi(model);
      toast.success("Model Delete Successfully", { autoClose: 3000 });
      return { model, ...response };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const addNewModel = createAsyncThunk(
  "ecommerce/addNewModel",
  async (model: any, thunkApi) => {
    try {
      const response = await addNewModelApi(model);
      toast.success("Model Added Successfully", { autoClose: 3000 });
      return response.data;
    } catch (error) {
      toast.error("Model Add Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const updateModel = createAsyncThunk(
  "ecommerce/updateModel",
  async (model: any, thunkApi) => {
    try {
      const response: any = await updateModelApi(model);
      toast.success("Model Updateded Successfully", { autoClose: 3000 });
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

//End Models

//Products
export const getProducts = createAsyncThunk(
  "ecommerce/getProducts",
  async () => {
    try {
      let response = await getProductsApi();
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const deleteProducts = createAsyncThunk(
  "ecommerce/deleteProducts",
  async (product: any) => {
    try {
      const response = deleteProductsApi(product);
      toast.success("Product Delete Successfully", { autoClose: 3000 });
      return { product, ...response };
    } catch (error) {
      toast.error("Product Delete Failed", { autoClose: 3000 });
      return error;
    }
  }
);
export const addNewProduct = createAsyncThunk(
  "ecommerce/addNewProduct",
  async (product: any) => {
    try {
      const response = addNewProductApi(product);
      const data = await response;
      toast.success("Product Added Successfully", { autoClose: 3000 });
      return data;
    } catch (error) {
      toast.error("Product Added Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "ecommerce/updateProduct",
  async (product: any) => {
    try {
      const response = updateProductApi(product);
      const data = await response;
      toast.success("Product Updateded Successfully", { autoClose: 3000 });
      return data;
    } catch (error) {
      toast.error("Product Updateded Failed", { autoClose: 3000 });
      return error;
    }
  }
);

//End Products
export const getOrders = createAsyncThunk("ecommerce/getOrders", async () => {
  try {
    const response = getOrdersApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getSellers = createAsyncThunk("ecommerce/getSellers", async () => {
  try {
    const response = getSellersApi();

    return response;
  } catch (error) {
    return error;
  }
});

export const getCustomers = createAsyncThunk(
  "ecommerce/getCustomers",
  async (_, thunkApi) => {
    try {
      let response = await getCustomersApi();
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "ecommerce/updateOrder",
  async (order: any) => {
    try {
      const response = updateOrderApi(order);
      const data = await response;
      toast.success("Order Updateded Successfully", { autoClose: 3000 });
      return data;
    } catch (error) {
      toast.error("Order Updateded Failed", { autoClose: 3000 });
      return error;
    }
  }
);
export const deleteOrder = createAsyncThunk(
  "ecommerce/deleteOrder",
  async (order: any) => {
    try {
      const response = deleteOrderApi(order);
      toast.success("Order Deleted Successfully", { autoClose: 3000 });
      return { order, ...response };
    } catch (error) {
      toast.error("Order Deleted Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const addNewOrder = createAsyncThunk(
  "ecommerce/addNewOrder",
  async (order: any) => {
    try {
      const response = addNewOrderApi(order);
      const data = await response;
      toast.success("Order Added Successfully", { autoClose: 3000 });
      return data;
    } catch (error) {
      toast.error("Order Added Failed", { autoClose: 3000 });
      return error;
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  "ecommerce/updateUserStatus",
  async (data: any, thunkApi) => {
    try {
      const response = updateUserStatusApi(data);
      const result = await response;
      toast.success("Customer Status Updateded Successfully", { autoClose: 3000 });
      return result;
    } catch (error: any) {
      toast.error("Customer Status Updateded Failed", { autoClose: 3000 });
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const updateCustomer = createAsyncThunk(
  "ecommerce/updateCustomer",
  async (customer: any, thunkApi) => {
    try {
      const response = updateCustomerApi(customer);
      const data = await response;
      toast.success("Customer Updateded Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      toast.error("Customer Updateded Failed", { autoClose: 3000 });
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "ecommerce/deleteCustomer",
  async (customer: any, thunkApi) => {
    try {
      const response = deleteCustomerApi(customer);
      const data = await response;
      toast.success("Customer Deleted Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      toast.warning(error.message, { autoClose: 3000 });
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addNewCustomer = createAsyncThunk(
  "ecommerce/addNewCustomer",
  async (customer: any, thunkApi) => {
    try {
      const response = addNewCustomerApi(customer);
      console.log("response", response);

      const data = await response;
      toast.success("Customer Added Successfully", { autoClose: 3000 });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response?.message || error.message);
    }
  }
);
