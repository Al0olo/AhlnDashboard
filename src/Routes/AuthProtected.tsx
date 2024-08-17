import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "redux-hooks";
import { useProfile } from "../Components/Hooks/UserHooks";
import { setAuthorization } from "../helpers/api_helper";
import { LogoutAction } from "../slices/auth/logout/thunk";

const AuthProtected = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const { userProfile, loading, token } = useProfile();

  useEffect(() => {
    if (userProfile && token) {
      setAuthorization(token);
    } else if (!userProfile && !loading && !token) {
      dispatch(LogoutAction());
    }
  }, [token, userProfile, loading, dispatch]);

  if (!userProfile && loading && !token) {
    return <Navigate to={{ pathname: "/login" }} />;
  }



  return <>{children}</>;
};

export default AuthProtected;
