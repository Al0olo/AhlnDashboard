import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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

    dispatch(LogoutAction()).then((res: any) => {
      if (res.type === "auth/logout/fulfilled") {
        toast("Logout successful", {
          position: "top-right",
          hideProgressBar: false,
          className: "bg-success text-white",
          progress: undefined,
          toastId: "",
        });

        localStorage.removeItem("authUser");
        navigate("/login")
      } else {
        toast.error("Logout failed. Please try again.");
      }
    });

  }, [dispatch, navigate]);

  return null;
};

export default Logout;
