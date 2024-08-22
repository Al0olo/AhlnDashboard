import { createSlice } from "@reduxjs/toolkit";
import {
  addShippingCompany,
  deleteShippingCompany,
  getDeliveryPackages,
  getOneDeliveryPackage,
  getShippingCompanies,
  updateShippingCompany,
} from "./thunk";

export const initialState: any = {
  deliveryPackages: [],
  shippingCompanies: [],
  loadingShippingCompany: true,
  loadingDeliveryPackage: true,
  error: {},
};

const deliveryReducer = createSlice({
  name: "deliverySlices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get shippingCompanies
    builder.addCase(getShippingCompanies.pending, (state: any) => {
      state.loadingShippingCompany = true;
      state.error = false;
    });
    builder.addCase(
      getShippingCompanies.fulfilled,
      (state: any, action: any) => {
        state.shippingCompanies = action?.payload;
        state.loadingShippingCompany = false;
      }
    );
    builder.addCase(
      getShippingCompanies.rejected,
      (state: any, { payload }: any) => {
        state.error = payload;
        state.loadingShippingCompany = false;
      }
    );

    // add new shippingCompanies
    builder.addCase(addShippingCompany.fulfilled, (state: any, action: any) => {
      state.shippingCompanies.push(action.payload);
      state.error = false;
    });
    builder.addCase(
      addShippingCompany.rejected,
      (state: any, { payload }: any) => {
        state.error = payload;
      }
    );

    // update shippingCompanies
    builder.addCase(
      updateShippingCompany.fulfilled,
      (state: any, action: any) => {
        const updatedShippingCompany = action.payload;
        const index = state.users.findIndex(
          (shippingCompanies: any) =>
            shippingCompanies.id === updatedShippingCompany.id
        );
        state.shippingCompanies[index] = updatedShippingCompany;
        state.error = false;
      }
    );
    builder.addCase(
      updateShippingCompany.rejected,
      (state: any, { payload }: any) => {
        state.error = payload;
      }
    );

    // delete shippingCompanies
    builder.addCase(
      deleteShippingCompany.fulfilled,
      (state: any, action: any) => {
        const deletedShippingCompany = action.payload.id;
        state.shippingCompanies = state.shippingCompanies.filter(
          (shippingCompanies: any) =>
            shippingCompanies.id !== deletedShippingCompany
        );
        state.error = false;
      }
    );
    builder.addCase(
      deleteShippingCompany.rejected,
      (state: any, { payload }: any) => {
        state.error = payload;
      }
    );

    // get deliveryPackages
    builder.addCase(getDeliveryPackages.pending, (state: any) => {
      state.loadingDeliveryPackage = true;
      state.error = false;
    });
    builder.addCase(
      getDeliveryPackages.fulfilled,
      (state: any, action: any) => {
        state.deliveryPackages = action.payload;
        state.loadingDeliveryPackage = false;
      }
    );
    builder.addCase(
      getDeliveryPackages.rejected,
      (state: any, { payload }: any) => {
        state.error = payload;
        state.loadingDeliveryPackage = false;
      }
    );

    builder.addCase(getOneDeliveryPackage.pending, (state: any) => {
      state.loadingDeliveryPackage = true;
      state.error = false;
    });
    builder.addCase(
      getOneDeliveryPackage.fulfilled,
      (state: any, action: any) => {
        state.deliveryPackage = action.payload;
        state.loadingDeliveryPackage = false;
      }
    );
    builder.addCase(
      getOneDeliveryPackage.rejected,
      (state: any, { payload }: any) => {
        state.error = payload;
        state.loadingDeliveryPackage = false;
      }
    );
  },
});

export const deliverySlices = deliveryReducer.reducer;
