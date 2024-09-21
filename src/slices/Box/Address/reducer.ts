import { createSlice } from "@reduxjs/toolkit";
import {
  AddAddressAction,
  DeleteAddressAction,
  GetOneAddressAction,
  GetAddressesAction,
  UpdateAddressAction,
} from "./thunk";

export const initialState: any = {
  addressList: [],
  oneAddress: {},
  loadingOne: true,
  loading: true,
  error: {},
};

const addressReducer = createSlice({
  name: "addressReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetAddressesAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetAddressesAction.fulfilled, (state, action: any) => {
      state.addressList = action?.payload;
      state.loading = false;
    });
    builder.addCase(GetAddressesAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(AddAddressAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(AddAddressAction.fulfilled, (state, action: any) => {
      state.addressList.push(action.payload);
      state.loading = false;
    });
    builder.addCase(AddAddressAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(DeleteAddressAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(DeleteAddressAction.fulfilled, (state, action: any) => {
      const deletedAddressId = action.payload.id;
      state.addressList = state.addressList.filter(
        (address: any) => address.id !== deletedAddressId
      );
      state.loading = false;
    });
    builder.addCase(DeleteAddressAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(GetOneAddressAction.pending, (state) => {
      state.loadingOne = true;
      state.error = false;
    });
    builder.addCase(GetOneAddressAction.fulfilled, (state, action: any) => {
      state.addressList = action?.payload;
      state.loadingOne = false;
    });
    builder.addCase(GetOneAddressAction.rejected, (state, { payload }: any) => {
      state.loadingOne = false;
      state.error = payload;
    });

    builder.addCase(UpdateAddressAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(UpdateAddressAction.fulfilled, (state, action: any) => {
      const updatedAddress = action?.payload;
      const index = state.addresses.findIndex(
        (addressList: any) => addressList.id === updatedAddress.id
      );
      state.addresses[index] = updatedAddress;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(UpdateAddressAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const addressSlices = addressReducer.reducer;
