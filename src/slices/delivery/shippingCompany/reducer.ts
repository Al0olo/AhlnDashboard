import { createSlice } from "@reduxjs/toolkit";
import {
  AddShippingCompanyAction,
  DeleteShippingCompanyAction,
  GetOneShippingCompanyAction,
  GetShippingCompaniesAction,
  UpdateShippingCompanyAction,
} from "./thunk";

export const initialState: any = {
  shippingCompaniesError: null,
  message: null,
  loading: true,
  data: null,
  success: false,
  error: false,
  shippingCompanieses: [],
};

const shippingCompaniesReducer = createSlice({
  name: "shippingCompaniesReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetShippingCompaniesAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      GetShippingCompaniesAction.fulfilled,
      (state, action: any) => {
        state.data = action?.payload;
        state.success = true;
        state.loading = false;
      }
    );
    builder.addCase(
      GetShippingCompaniesAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      }
    );

    builder.addCase(AddShippingCompanyAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      AddShippingCompanyAction.fulfilled,
      (state, action: any) => {
        state.shippingCompanieses.push(action.payload);
        state.success = true;
        state.loading = false;
      }
    );
    builder.addCase(
      AddShippingCompanyAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      }
    );

    builder.addCase(DeleteShippingCompanyAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      DeleteShippingCompanyAction.fulfilled,
      (state, action: any) => {
        const deletedShippingCompaniesId = action.payload.id;
        state.shippingCompanieses = state.shippingCompanieses.filter(
          (shippingCompanies: any) =>
            shippingCompanies.id !== deletedShippingCompaniesId
        );
        state.success = true;
        state.loading = false;
      }
    );
    builder.addCase(
      DeleteShippingCompanyAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      }
    );

    builder.addCase(GetOneShippingCompanyAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      GetOneShippingCompanyAction.fulfilled,
      (state, action: any) => {
        state.shippingCompanies = action?.payload;
        state.success = true;
        state.loading = false;
      }
    );
    builder.addCase(
      GetOneShippingCompanyAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      }
    );

    builder.addCase(UpdateShippingCompanyAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      UpdateShippingCompanyAction.fulfilled,
      (state, action: any) => {
        const updatedShippingCompanies = action?.payload;
        const index = state.shippingCompanieses.findIndex(
          (shippingCompanies: any) =>
            shippingCompanies.id === updatedShippingCompanies.id
        );
        state.shippingCompanieses[index] = updatedShippingCompanies;
        state.success = true;
        state.loading = false;
      }
    );
    builder.addCase(
      UpdateShippingCompanyAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      }
    );
  },
});

export const shippingCompaniesSlices = shippingCompaniesReducer.reducer;
