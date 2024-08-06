import { createSlice } from "@reduxjs/toolkit";
import { GetDeliveryPackagesAction, GetOneDeliveryPackagAction } from "./thunk";

export const initialState: any = {
  deliveryError: null,
  message: null,
  loading: true,
  data: null,
  success: false,
  error: false,
  deliveryes: [],
};

const deliveryReducer = createSlice({
  name: "deliveryReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetDeliveryPackagesAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      GetDeliveryPackagesAction.fulfilled,
      (state, action: any) => {
        state.data = action?.payload;
        state.success = true;
        state.loading = false;
      }
    );
    builder.addCase(
      GetDeliveryPackagesAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      }
    );

    builder.addCase(GetOneDeliveryPackagAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      GetOneDeliveryPackagAction.fulfilled,
      (state, action: any) => {
        state.delivery = action?.payload;
        state.success = true;
        state.loading = false;
      }
    );
    builder.addCase(
      GetOneDeliveryPackagAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      }
    );
  },
});

export const deliverySlices = deliveryReducer.reducer;
