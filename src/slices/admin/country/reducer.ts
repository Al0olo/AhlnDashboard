import { createSlice } from "@reduxjs/toolkit";
import {
  AddCountryAction,
  DeleteCountryAction,
  GetCountryAction,
  UpdateCountryAction,
} from "./thunk";

export const initialState: any = {
  countryList: [],
  loading: true,
  error: {},
};

const countryReducer = createSlice({
  name: "countryReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetCountryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetCountryAction.fulfilled, (state, action: any) => {
      state.countryList = action?.payload;
      state.loading = false;
    });
    builder.addCase(GetCountryAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(AddCountryAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(AddCountryAction.fulfilled, (state, action: any) => {
      state.countryList.push(action.payload);
      state.loading = false;
    });
    builder.addCase(AddCountryAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(DeleteCountryAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(DeleteCountryAction.fulfilled, (state, action: any) => {
      const deletedCountryId = action.payload.id;
      state.countryList = state.countryList.filter(
        (country: any) => country.id !== deletedCountryId
      );
      state.loading = false;
    });
    builder.addCase(DeleteCountryAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(UpdateCountryAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(UpdateCountryAction.fulfilled, (state, action: any) => {
      const updatedCountry = action?.payload;
      const index = state.countryList.findIndex(
        (country: any) => country.id === updatedCountry.id
      );
      state.countryList[index] = updatedCountry;
      state.loading = false;
    });
    builder.addCase(UpdateCountryAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const countrySlices = countryReducer.reducer;
