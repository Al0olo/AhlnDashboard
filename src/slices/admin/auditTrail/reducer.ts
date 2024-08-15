import { createSlice } from "@reduxjs/toolkit";
import {
  DeleteAuditTrailAction,
  GetAuditTrailAction,
  GetOneAuditTrailAction,
} from "./thunk";

export const initialState: any = {
  auditTrailError: null,
  message: null,
  loading: true,
  data: null,
  success: false,
  error: false,
  auditTrail: [],
};

const auditTrailReducer = createSlice({
  name: "auditTrailReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetAuditTrailAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetAuditTrailAction.fulfilled, (state, action: any) => {
      state.data = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(GetAuditTrailAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    builder.addCase(DeleteAuditTrailAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(DeleteAuditTrailAction.fulfilled, (state, action: any) => {
      const deletedAuditTrailId = action.payload.id;
      state.auditTrail = state.auditTrail.filter(
        (auditTrail: any) => auditTrail.id !== deletedAuditTrailId
      );
      state.success = true;
      state.loading = false;
    });
    builder.addCase(
      DeleteAuditTrailAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      }
    );

    builder.addCase(GetOneAuditTrailAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetOneAuditTrailAction.fulfilled, (state, action: any) => {
      state.auditTrail = action?.payload;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(
      GetOneAuditTrailAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      }
    );
  },
});

export const auditTrailSlices = auditTrailReducer.reducer;
