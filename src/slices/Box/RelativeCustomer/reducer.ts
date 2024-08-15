import { createSlice } from "@reduxjs/toolkit";
import { GetRelativeCustomerAction } from "./thunk";

export const initialState: any = {
  relativeCustomerError: null,
  message: null,
  loading: true,
  data: null,
  success: false,
  error: false,
  relativeCustomers: [],
};

const relativeCustomerReducer = createSlice({
  name: "relativeCustomerReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetRelativeCustomerAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetRelativeCustomerAction.fulfilled, (state, action: any) => {
      state.data = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(
      GetRelativeCustomerAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      }
    );
  },
});

export const relativeCustomerSlices = relativeCustomerReducer.reducer;
