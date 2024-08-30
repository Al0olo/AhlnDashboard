import { createSlice } from "@reduxjs/toolkit";
import {
  AddTabletAction,
  DeleteTabletAction,
  GetOneTabletAction,
  GetTabletsAction,
  UpdateTabletAction,
} from "./thunk";

export const initialState: any = {
  loading: true,
  loadingOneTablet: true,
  error: {},
  tablets: [],
  tablet: {},
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
      state.success = true;
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
      state.success = true;
      state.loading = false;
    });
    builder.addCase(AddTabletAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
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
      state.success = true;
      state.loading = false;
    });
    builder.addCase(DeleteTabletAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(GetOneTabletAction.pending, (state) => {
      state.loadingOneTablet = true;
      state.error = false;
    });
    builder.addCase(GetOneTabletAction.fulfilled, (state, action: any) => {
      state.tablet = action?.payload;
      state.success = true;
      state.loadingOneTablet = false;
    });
    builder.addCase(GetOneTabletAction.rejected, (state, { payload }: any) => {
      state.loadingOneTablet = false;
      state.success = false;
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
      state.success = true;
      state.loading = false;
    });
    builder.addCase(UpdateTabletAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export const tabletSlices = tabletReducer.reducer;
