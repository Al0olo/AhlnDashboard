import { createSlice } from "@reduxjs/toolkit";
import {
  AddBoxGenerationAction,
  GetBoxGenerationsAction,
  UpdateBoxGenerationAction,
  DeleteBoxGenerationAction,
} from "./thunk";

export const initialState: any = {
  boxGeneration: [],
  loading: true,
  error: {},
};

const boxGenerationReducer = createSlice({
  name: "boxGenerationReducers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetBoxGenerationsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetBoxGenerationsAction.fulfilled, (state, action: any) => {
      state.boxGenerations = action?.payload;
      state.loading = false;
    });
    builder.addCase(
      GetBoxGenerationsAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );

    builder.addCase(AddBoxGenerationAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(AddBoxGenerationAction.fulfilled, (state, action: any) => {
      state.boxGenerations.push(action.payload);
      state.loading = false;
    });
    builder.addCase(
      AddBoxGenerationAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );

    builder.addCase(DeleteBoxGenerationAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      DeleteBoxGenerationAction.fulfilled,
      (state, action: any) => {
        const deletedBoxGenerationId = action.payload.id;
        state.boxGenerations = state.boxGenerations.filter(
          (boxGeneration: any) => boxGeneration.id !== deletedBoxGenerationId
        );
        state.loading = false;
      }
    );
    builder.addCase(
      DeleteBoxGenerationAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );

    builder.addCase(UpdateBoxGenerationAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      UpdateBoxGenerationAction.fulfilled,
      (state, action: any) => {
        const updatedBoxGeneration = action?.payload;
        const index = state.boxGenerations.findIndex(
          (boxGeneration: any) => boxGeneration.id === updatedBoxGeneration.id
        );
        state.boxGenerations[index] = updatedBoxGeneration;
        state.loading = false;
      }
    );
    builder.addCase(
      UpdateBoxGenerationAction.rejected,
      (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      }
    );
  },
});

export const boxGenerationSlices = boxGenerationReducer.reducer;
