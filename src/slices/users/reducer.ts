import { createSlice } from "@reduxjs/toolkit";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  addCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
  getRelativeCustomers,
} from "./thunk";

export const initialState: any = {
  users: [],
  loadingUser: true,
  loadingCustomer: true,
  loadingRelativeCustomer: true,
  error: {},
};

const usersReducer = createSlice({
  name: "UsersSlices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get users
    builder.addCase(getUsers.pending, (state: any) => {
      state.loadingUser = true;
      state.error = false;
    });
    builder.addCase(getUsers.fulfilled, (state: any, action: any) => {
      state.users = action?.payload;
      state.loadingUser = false;
    });
    builder.addCase(getUsers.rejected, (state: any, { payload }: any) => {
      state.error = payload;
      state.loadingUser = false;
    });

    // add new user
    builder.addCase(addUser.fulfilled, (state: any, action: any) => {
      state.users.push(action.payload);
      state.error = false;
    });
    builder.addCase(addUser.rejected, (state: any, { payload }: any) => {
      state.error = payload;
    });

    // update user
    builder.addCase(updateUser.fulfilled, (state: any, action: any) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex(
        (user: any) => user.id === updatedUser.id
      );
      state.users[index] = updatedUser;
      state.error = false;
    });
    builder.addCase(updateUser.rejected, (state: any, { payload }: any) => {
      state.error = payload;
    });

    // delete user
    builder.addCase(deleteUser.fulfilled, (state: any, action: any) => {
      const deletedUser = action.payload.id;
      state.users = state.users.filter((user: any) => user.id !== deletedUser);
      state.error = false;
    });
    builder.addCase(deleteUser.rejected, (state: any, { payload }: any) => {
      state.error = payload;
    });

    // customers
    builder.addCase(getCustomers.pending, (state: any) => {
      state.loadingCustomer = true;
      state.error = false;
    });
    builder.addCase(getCustomers.fulfilled, (state: any, action: any) => {
      state.users = action?.payload;
      state.loadingCustomer = false;
    });
    builder.addCase(getCustomers.rejected, (state: any, { payload }: any) => {
      state.error = payload;
      state.loadingCustomer = false;
    });

    // add new user
    builder.addCase(addCustomer.fulfilled, (state: any, action: any) => {
      state.users.unshift(action.payload);
      state.error = false;
    });
    builder.addCase(addCustomer.rejected, (state: any, { payload }: any) => {
      state.error = payload;
    });

    // update user
    builder.addCase(updateCustomer.fulfilled, (state: any, action: any) => {
      const updatedCustomer = action.payload;
      const index = state.users.findIndex(
        (user: any) => user.id === updatedCustomer.id
      );
      state.users[index] = updatedCustomer;
      state.error = false;
    });
    builder.addCase(updateCustomer.rejected, (state: any, { payload }: any) => {
      state.error = payload;
    });

    // delete user
    builder.addCase(deleteCustomer.fulfilled, (state: any, action: any) => {
      const deletedCustomer = action.payload.id;
      state.users = state.users.filter(
        (user: any) => user.id !== deletedCustomer
      );
      state.error = false;
    });
    builder.addCase(deleteCustomer.rejected, (state: any, { payload }: any) => {
      state.error = payload;
    });

    // get relative customers
    builder.addCase(getRelativeCustomers.pending, (state: any) => {
      state.loadingRelativeCustomer = true;
      state.error = false;
    });
    builder.addCase(
      getRelativeCustomers.fulfilled,
      (state: any, action: any) => {
        state.users = action?.payload;
        state.loadingRelativeCustomer = false;
      }
    );
    builder.addCase(
      getRelativeCustomers.rejected,
      (state: any, { payload }: any) => {
        state.error = payload;
        state.loadingRelativeCustomer = false;
      }
    );
  },
});

export const usersSlices = usersReducer.reducer;
