import { createSlice } from "@reduxjs/toolkit";
import {
  AddCityAction,
  DeleteCityAction,
  GetCityAction,
  GetCityInCountryAction,
  UpdateCityAction,
} from "./thunk";

export const initialState: any = {
  cityList: [],
  cityInCountryList: [],
  loading: true,
  error: {},
};

const cityReducer = createSlice({
  name: "cityReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetCityAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetCityAction.fulfilled, (state, action: any) => {
      state.cityList = action?.payload;
      state.loading = false;
    });
    builder.addCase(GetCityAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(GetCityInCountryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetCityInCountryAction.fulfilled, (state, action: any) => {
      state.cityInCountryList = action?.payload;
      state.loading = false;
    });
    builder.addCase(
      GetCityInCountryAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );

    builder.addCase(AddCityAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(AddCityAction.fulfilled, (state, action: any) => {
      state.cityList.push(action.payload);
      state.loading = false;
    });
    builder.addCase(AddCityAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(DeleteCityAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(DeleteCityAction.fulfilled, (state, action: any) => {
      const deletedCityId = action.payload.id;
      state.cityList = state.cityList.filter(
        (city: any) => city.id !== deletedCityId
      );
      state.loading = false;
    });
    builder.addCase(DeleteCityAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(UpdateCityAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(UpdateCityAction.fulfilled, (state, action: any) => {
      const updatedCity = action?.payload;
      const index = state.cityList.findIndex(
        (city: any) => city.id === updatedCity.id
      );
      state.cityList[index] = updatedCity;
      state.loading = false;
    });
    builder.addCase(UpdateCityAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const citySlices = cityReducer.reducer;
