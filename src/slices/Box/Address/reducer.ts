import { createSlice } from "@reduxjs/toolkit";
import {
  AddAddressAction,
  DeleteAddressAction,
  GetOneAddressAction,
  GetAddressesAction,
  UpdateAddressAction,
} from "./thunk";

export const initialState: any = {
  addressError: null,
  message: null,
  loading: true,
  data: null,
  success: false,
  error: false,
  addresses: [],
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
      state.data = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(GetAddressesAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(AddAddressAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(AddAddressAction.fulfilled, (state, action: any) => {
      state.addresses.push(action.payload);
      state.success = true;
      state.loading = false;
    });
    builder.addCase(AddAddressAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(DeleteAddressAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(DeleteAddressAction.fulfilled, (state, action: any) => {
      const deletedAddressId = action.payload.id;
      state.addresses = state.addresses.filter(
        (address: any) => address.id !== deletedAddressId
      );
      state.success = true;
      state.loading = false;
    });
    builder.addCase(DeleteAddressAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(GetOneAddressAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetOneAddressAction.fulfilled, (state, action: any) => {
      state.address = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(GetOneAddressAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(UpdateAddressAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(UpdateAddressAction.fulfilled, (state, action: any) => {
      const updatedAddress = action?.payload;
      const index = state.addresses.findIndex(
        (address: any) => address.id === updatedAddress.id
      );
      state.addresses[index] = updatedAddress;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(UpdateAddressAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export const addressSlices = addressReducer.reducer;
