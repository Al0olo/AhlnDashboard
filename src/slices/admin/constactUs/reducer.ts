import { createSlice } from "@reduxjs/toolkit";
import {
  DeleteContactUsAction,
  GetContactUsAction,
  GetOneContactUsAction,
} from "./thunk";

export const initialState: any = {
  contactUsList: [],
  loading: true,
  loadingOne: true,
  error: {},
  oneContactUs: {},
};

const contactUsReducer = createSlice({
  name: "contactUsReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetContactUsAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetContactUsAction.fulfilled, (state, action: any) => {
      state.contactUsList = action?.payload;
      state.loading = false;
    });
    builder.addCase(GetContactUsAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(DeleteContactUsAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(DeleteContactUsAction.fulfilled, (state, action: any) => {
      const deletedContactUsId = action.payload.id;
      state.contactUsList = state.contactUsList.filter(
        (contactUsList: any) => contactUsList.id !== deletedContactUsId
      );
      state.loading = false;
    });
    builder.addCase(
      DeleteContactUsAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );

    builder.addCase(GetOneContactUsAction.pending, (state) => {
      state.loadingOne = true;
      state.error = false;
    });
    builder.addCase(GetOneContactUsAction.fulfilled, (state, action: any) => {
      state.oneContactUs = action?.payload;
      state.loadingOne = false;
    });
    builder.addCase(
      GetOneContactUsAction.rejected,
      (state, { payload }: any) => {
        state.loadingOne = false;
        state.error = payload;
      }
    );
  },
});

export const contactUsSlices = contactUsReducer.reducer;
