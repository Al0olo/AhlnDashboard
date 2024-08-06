import { createSlice } from "@reduxjs/toolkit";
import {
  getModels,
  getModel,
  addNewModel,
  updateModel,
  deleteModels,
  getProducts,
  addNewProduct,
  updateProduct,
  deleteProducts,
  getOrders,
  addNewOrder,
  updateOrder,
  deleteOrder,
  getCustomers,
  addNewCustomer,
  updateCustomer,
  deleteCustomer,
  getSellers,
} from "./thunk";
export const initialState: any = {
  models: [],
  model: {},
  products: [],
  orders: [],
  sellers: [],
  customers: [],
  error: {},
  modelLoading:false
};

const EcommerceSlice = createSlice({
  name: "EcommerceSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Models
    builder.addCase(getModels.fulfilled, (state: any, action: any) => {
      state.models = action.payload;
    });
    builder.addCase(getModel.pending, (state: any, action: any) => {
      state.modelLoading = true
    });
    builder.addCase(getModel.fulfilled, (state: any, action: any) => {
      state.modelLoading=false;
      state.model = action.payload;
    });
 builder.addCase(updateModel.fulfilled, (state: any, action: any) => {
      state.models = state.models.map((model: any) =>
        model.id === action.payload.id ? { ...model, ...action.payload } : model
      );
      
    });
    builder.addCase(deleteModels.fulfilled, (state: any, action: any) => {
      state.models = (state.models || []).filter(
        (model: any) => model.id.toString() !== action.payload.model.toString()
      );
    });
    //End Models
    builder.addCase(getProducts.fulfilled, (state: any, action: any) => {
      state.products = action.payload;
    });

    builder.addCase(getProducts.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(addNewProduct.fulfilled, (state: any, action: any) => {
      state.products.push(action.payload);
    });

    builder.addCase(addNewProduct.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(updateProduct.fulfilled, (state: any, action: any) => {
      state.products = state.products.map((product: any) =>
        product.id === action.payload.id
          ? { ...product, ...action.payload }
          : product
      );
    });

    builder.addCase(updateProduct.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteProducts.fulfilled, (state: any, action: any) => {
      state.products = (state.products || []).filter(
        (product: any) =>
          product.id.toString() !== action.payload.product.toString()
      );
    });

    builder.addCase(deleteProducts.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getOrders.fulfilled, (state: any, action: any) => {
      state.orders = action.payload;
      state.isOrderCreated = false;
      state.isOrderSuccess = true;
    });

    builder.addCase(getOrders.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
      state.isOrderCreated = false;
      state.isOrderSuccess = false;
    });

    builder.addCase(addNewOrder.fulfilled, (state: any, action: any) => {
      state.orders.push(action.payload);
      state.isOrderCreated = true;
    });

    builder.addCase(addNewOrder.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(updateOrder.fulfilled, (state: any, action: any) => {
      state.orders = state.orders.map((order: any) =>
        order.id === action.payload.id ? { ...order, ...action.payload } : order
      );
    });

    builder.addCase(updateOrder.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteOrder.fulfilled, (state: any, action: any) => {
      state.orders = state.orders.filter(
        (order: any) => order.id.toString() !== action.payload.order.toString()
      );
    });

    builder.addCase(deleteOrder.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getSellers.fulfilled, (state: any, action: any) => {
      state.sellers = action.payload;
    });

    builder.addCase(getSellers.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getCustomers.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(getCustomers.fulfilled, (state: any, action: any) => {
      state.data = action?.payload;
      state.success = true;
      state.loading = false;
      state.isCustomerCreated = false;
      state.isCustomerSuccess = true;
      console.log(state.data);
    });

    builder.addCase(getCustomers.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
      state.isCustomerCreated = false;
      state.isCustomerSuccess = false;
    });

    builder.addCase(addNewCustomer.fulfilled, (state: any, action: any) => {
      state.customers.push(action.payload);
      state.isCustomerCreated = true;
    });
    builder.addCase(addNewCustomer.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(updateCustomer.fulfilled, (state: any, action: any) => {
      state.customers = state.customers.map((customer: any) =>
        customer.id === action.payload.id
          ? { ...customer, ...action.payload }
          : customer
      );
    });
    builder.addCase(updateCustomer.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteCustomer.fulfilled, (state: any, action: any) => {
      state.customers = state.customers.filter(
        (customer: any) =>
          customer.id.toString() !== action.payload.customer.toString()
      );
    });
    builder.addCase(deleteCustomer.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });
  },
});

export default EcommerceSlice.reducer;
