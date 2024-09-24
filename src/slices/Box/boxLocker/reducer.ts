import { createSlice } from "@reduxjs/toolkit";
import {
  DeleteBoxLockerAction,
  GetBoxLockersAction,
  UpdateBoxLockerAction,
} from "./thunk";

export const initialState: any = {
  loading: true,
  error: {},
  boxLockers: [],
};

const boxLockerReducer = createSlice({
  name: "boxLockerReducers",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(GetBoxLockersAction.pending, (state: any) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(GetBoxLockersAction.fulfilled, (state, action: any) => {
      state.boxLockers = action?.payload;
      state.loading = false;
    });
    builder.addCase(GetBoxLockersAction.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(DeleteBoxLockerAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(DeleteBoxLockerAction.fulfilled, (state, action: any) => {
      const deletedBoxLockerId = action.payload.id;
      state.boxLockers = state.boxLockers.filter(
        (dboxLocker: any) => dboxLocker.id !== deletedBoxLockerId
      );
      state.loading = false;
    });
    builder.addCase(
      DeleteBoxLockerAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );

    builder.addCase(UpdateBoxLockerAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(UpdateBoxLockerAction.fulfilled, (state, action: any) => {
      const updatedBoxLocker = action?.payload;
      const index = state.boxLockers.findIndex(
        (dboxLocker: any) => dboxLocker.id === updatedBoxLocker.id
      );
      state.boxLockers[index] = updatedBoxLocker;
      state.loading = false;
    });
    builder.addCase(
      UpdateBoxLockerAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );
  },
});

export const boxLockerSlices = boxLockerReducer.reducer;
