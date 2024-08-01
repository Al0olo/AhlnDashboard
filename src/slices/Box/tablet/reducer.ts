import { createSlice } from "@reduxjs/toolkit";
import { TabletAction } from "./thunk";

export const initialState: any = {
  tabletError: null,
  message: null,
  loading: false,
  data: null,
  success: false,
  error: false,
};

const tabletReducer = createSlice({
  name: "tabletReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(TabletAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(TabletAction.fulfilled, (state, action: any) => {
      state.data = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(TabletAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export const tabletSlices = tabletReducer.reducer;
