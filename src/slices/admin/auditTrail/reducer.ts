import { createSlice } from "@reduxjs/toolkit";
import { DeleteAuditTrailAction, GetAuditTrailAction } from "./thunk";

export const initialState: any = {
  loading: true,
  error: {},
  auditTrailList: [],
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
      state.auditTrailList = action?.payload;
      state.loading = false;
    });
    builder.addCase(GetAuditTrailAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(DeleteAuditTrailAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(DeleteAuditTrailAction.fulfilled, (state, action: any) => {
      const deletedAuditTrailId = action.payload.id;
      state.auditTrailList = state.auditTrailList.filter(
        (auditTrailList: any) => auditTrailList.id !== deletedAuditTrailId
      );
      state.loading = false;
    });
    builder.addCase(
      DeleteAuditTrailAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );
  },
});

export const auditTrailSlices = auditTrailReducer.reducer;
