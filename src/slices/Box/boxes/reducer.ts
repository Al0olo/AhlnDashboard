import { createSlice } from "@reduxjs/toolkit";
import { GetBoxAction, AddBoxAction } from "./thunk";

export const initialState: any = {
  boxError: null,
  message: null,
  loading: false,
  data: null,
  success: false,
  error: false,
  boxes: [],
};

const boxReducer = createSlice({
  name: "boxReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetBoxAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetBoxAction.fulfilled, (state, action: any) => {
      state.data = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(GetBoxAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(AddBoxAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(AddBoxAction.fulfilled, (state, action: any) => {
      state.boxes.push(action.payload);
      state.success = true;
      state.loading = false;
    });
    builder.addCase(AddBoxAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export const boxSlices = boxReducer.reducer;
