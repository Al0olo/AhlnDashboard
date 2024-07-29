import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { toast } from "react-toastify";

import { LogoutAction } from "../../slices/thunks";

const Logout: React.FC = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  // const isUserLogoutSelector = createSelector(
  //   (state: any) => state.auth,
  //   (auth) => auth.isUserLogout
  // );
  // const isUserLogout = useSelector(isUserLogoutSelector);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      dispatch(LogoutAction()).then((res: any) => {
        if (res.type === "auth/logout/fulfilled") {
          toast("Logout successful", {
            position: "top-right",
            hideProgressBar: false,
            className: "bg-success text-white",
            progress: undefined,
            toastId: "",
          });

          sessionStorage.removeItem("token");
          navigate("/login");
        } else {
          toast.error("Logout failed. Please try again.");
        }
      });
    } else if (!token) {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return null;
};

export default Logout;
