import { createSlice } from "@reduxjs/toolkit";
import {
  DeleteBoxAction,
  GetBoxesAction,
  GetOneBoxAction,
  UpdateBoxAction,
  AddBoxAction,
} from "./thunk";

export const initialState: any = {
  boxes: [],
  loading: true,
  loadingOne: true,
  error: {},
  box: {},
};

const boxReducer = createSlice({
  name: "boxReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetBoxesAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetBoxesAction.fulfilled, (state, action: any) => {
      state.boxes = action?.payload;
      state.loading = false;
    });
    builder.addCase(GetBoxesAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(AddBoxAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(AddBoxAction.fulfilled, (state, action: any) => {
      state.boxes.push(action.payload);
      state.loading = false;
    });
    builder.addCase(AddBoxAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(DeleteBoxAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(DeleteBoxAction.fulfilled, (state, action: any) => {
      const deletedBoxId = action.payload.id;
      state.boxes = state.boxes.filter((box: any) => box.id !== deletedBoxId);
      state.loading = false;
    });
    builder.addCase(DeleteBoxAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(GetOneBoxAction.pending, (state) => {
      state.loadingOne = true;
      state.error = false;
    });
    builder.addCase(GetOneBoxAction.fulfilled, (state, action: any) => {
      state.box = action?.payload;
      state.loadingOne = false;
    });
    builder.addCase(GetOneBoxAction.rejected, (state, { payload }: any) => {
      state.loadingOne = false;
      state.error = payload;
    });

    builder.addCase(UpdateBoxAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(UpdateBoxAction.fulfilled, (state, action: any) => {
      const updatedBox = action?.payload;
      const index = state.boxes.findIndex(
        (box: any) => box.id === updatedBox.id
      );
      state.boxes[index] = updatedBox;
      state.loading = false;
    });
    builder.addCase(UpdateBoxAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const boxSlices = boxReducer.reducer;
