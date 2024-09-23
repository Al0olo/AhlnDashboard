import { createSlice } from "@reduxjs/toolkit";
import { GetBoxesImagesAction } from "./thunk";

export const initialState: any = {
  loading: true,
  error: {},
  boxImgesList: [],
};

const boxImgesReducer = createSlice({
  name: "boxImgesReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetBoxesImagesAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetBoxesImagesAction.fulfilled, (state, action: any) => {
      state.boxImgesList = action?.payload;
      state.loading = false;
    });
    builder.addCase(
      GetBoxesImagesAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );
  },
});

export const boxImgesSlices = boxImgesReducer.reducer;
