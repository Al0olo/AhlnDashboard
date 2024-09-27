import { createSlice } from "@reduxjs/toolkit";
import {
  AddTabletAction,
  DeleteTabletAction,
  GetTabletsAction,
  UpdateTabletAction,
} from "./thunk";

export const initialState: any = {
  loading: true,
  error: {},
  tablets: [],
};

const tabletReducer = createSlice({
  name: "tabletReducers",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(GetTabletsAction.pending, (state: any) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetTabletsAction.fulfilled, (state, action: any) => {
      state.tablets = action?.payload;
      state.loading = false;
    });
    builder.addCase(GetTabletsAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(AddTabletAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(AddTabletAction.fulfilled, (state, action: any) => {
      state.tablets.push(action.payload);
      state.loading = false;
    });
    builder.addCase(AddTabletAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(DeleteTabletAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(DeleteTabletAction.fulfilled, (state, action: any) => {
      const deletedTabletId = action.payload.id;
      state.tablets = state.tablets.filter(
        (tablet: any) => tablet.id !== deletedTabletId
      );
      state.loading = false;
    });
    builder.addCase(DeleteTabletAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(UpdateTabletAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(UpdateTabletAction.fulfilled, (state, action: any) => {
      const updatedTablet = action?.payload;
      const index = state.tablets.findIndex(
        (tablet: any) => tablet.id === updatedTablet.id
      );
      state.tablets[index] = updatedTablet;
      state.loading = false;
    });
    builder.addCase(UpdateTabletAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const tabletSlices = tabletReducer.reducer;
