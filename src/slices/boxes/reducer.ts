import { createSlice } from "@reduxjs/toolkit";
import { BoxAction } from "./thunk";

export const initialState: any = {
  boxError: null,
  message: null,
  loading: false,
  user: null,
  success: false,
  error: false,
};

const boxReducer = createSlice({
  name: "boxReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(BoxAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(BoxAction.fulfilled, (state, action: any) => {
      state.user = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(BoxAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export const boxSlices = boxReducer.reducer;
