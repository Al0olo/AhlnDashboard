//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
} from "../../../helpers/fakebackend_helper";

import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag } from './reducer';

// const fireBaseBackend = getFirebaseBackend();

export const loginUser = (user : any, history : any) => async (dispatch : any) => {
  try {
    let response;

    if (process.env.REACT_APP_API_URL) {
      response = postFakeLogin({
        email: user.email,
        password: user.password,
      });
    }

    console.log("5555555555555555555555555555555")
    var data = await response;

    if (data) {
      sessionStorage.setItem("authUser", JSON.stringify(data));
      if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
        var finallogin: any= JSON.stringify(data);
        finallogin = JSON.parse(finallogin)
        data = finallogin.data;
        if (finallogin.success) {
          dispatch(loginSuccess(data));
          history('/dashboard')
        } else {
          dispatch(apiError(finallogin));
        }
      } else {
        dispatch(loginSuccess(data));
        history('/dashboard')
      }
    } else{console.log("44444444444444444     ",data)
      dispatch(apiError(data));
    }
  } catch (error : any) {
  console.log("777777777777777777777    ",error)
    
    dispatch(apiError(error));
  }
};

export const logoutUser = () => async (dispatch : any) => {
  try {
    sessionStorage.removeItem("authUser");
    let fireBaseBackend : any= getFirebaseBackend();
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = fireBaseBackend.logout;
      dispatch(logoutUserSuccess(response));
    } else {
      dispatch(logoutUserSuccess(true));
    }

  } catch (error : any) {
    dispatch(apiError(error));
  }
};

export const resetLoginFlag = () => async (dispatch : any) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error : any ){
    dispatch(apiError(error));
  }
};