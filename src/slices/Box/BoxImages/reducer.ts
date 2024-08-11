import { createSlice } from "@reduxjs/toolkit";
import { GetBoxesImagesAction } from "./thunk";

export const initialState: any = {
  boxImgesError: null,
  message: null,
  loading: true,
  data: null,
  success: false,
  error: false,
  boxImgess: [],
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
      state.data = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(
      GetBoxesImagesAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      }
    );
  },
});

export const boxImgesSlices = boxImgesReducer.reducer;
