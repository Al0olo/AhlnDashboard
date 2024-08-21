import { APIClient } from "../../api_helper";

import * as url from "../../backend_urls/users";

const api = new APIClient();

// RELATIVE CUSTOMER
// Get All Relative Customer
export const getRelativeCustomers = () => {
  return api.get(url.GET_RELATIVE_CUSTOMER);
};

// Update Relative Customer Status
export const updateRelativeCustomerStatusApi = (data: any) => {
  return api.update(url.UPDATE_CUSTOMER + `/${data.id}`, data); // same as update customer -same api-
};

// USER
// get User
export const getUsers = () => api.get(url.GET_CUSTOMERS);

// update User
export const getOneUser = (customer: any) =>
  api.get(url.GET_ONE_CUSTOMER + `/${customer.id}`, customer);

// add User
export const addUser = (customer: any) =>
  api.create(url.ADD_NEW_CUSTOMER, customer);

// update User
export const updateUser = (customer: any) =>
  api.update(url.UPDATE_CUSTOMER + `/${customer.id}`, customer);

// delete User
export const deleteUser = (customer: any) =>
  api.delete(url.DELETE_CUSTOMER + `/${customer}`);

// get Customers
export const getCustomers = () => api.get(url.GET_CUSTOMERS);

// add Customers
export const addCustomer = (customer: any) =>
  api.create(url.ADD_NEW_CUSTOMER, customer);

// update Customers
export const updateCustomer = (customer: any) =>
  api.update(url.UPDATE_CUSTOMER + `/${customer.id}`, customer);

// update user status
export const updateUserStatusApi = (data: any) =>
  api.update(url.UPDATE_USER_STATUS, data);
// delete Customers
export const deleteCustomer = (customer: any) =>
  api.delete(url.DELETE_CUSTOMER + `/${customer}`);
