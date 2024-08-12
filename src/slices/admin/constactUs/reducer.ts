import { createSlice } from "@reduxjs/toolkit";
import {
  DeleteContactUsAction,
  GetContactUsAction,
  GetOneContactUsAction,
} from "./thunk";

export const initialState: any = {
  contactUsError: null,
  message: null,
  loading: true,
  data: null,
  success: false,
  error: false,
  contactUs: [],
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
      state.data = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(GetContactUsAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(DeleteContactUsAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(DeleteContactUsAction.fulfilled, (state, action: any) => {
      const deletedContactUsId = action.payload.id;
      state.contactUs = state.contactUs.filter(
        (contactUs: any) => contactUs.id !== deletedContactUsId
      );
      state.success = true;
      state.loading = false;
    });
    builder.addCase(
      DeleteContactUsAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      }
    );

    builder.addCase(GetOneContactUsAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetOneContactUsAction.fulfilled, (state, action: any) => {
      state.contactUs = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(
      GetOneContactUsAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      }
    );
  },
});

export const contactUsSlices = contactUsReducer.reducer;
