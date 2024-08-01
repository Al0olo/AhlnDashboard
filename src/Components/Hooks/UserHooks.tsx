import { useEffect, useState } from "react";
import { getLoggedinUser } from "../../helpers/api_helper";

const useProfile = () => {
  const userProfileSession = getLoggedinUser();
  var token = userProfileSession && userProfileSession["token"];
  const [loading, setLoading] = useState(userProfileSession ? false : true);
  const [userProfile, setUserProfile] = useState(userProfileSession ? userProfileSession : null);
  console.log("Yasserrtoken=>", token);
  console.log("userProfileuseProfileuseProfileuseProfile", userProfile);

  useEffect(() => {
    const userProfileSession = getLoggedinUser();
    var token =
      userProfileSession &&
      userProfileSession["token"];
    setUserProfile(userProfileSession ? userProfileSession : null);
    setLoading(token ? false : true);
  }, [token]);


  return { userProfile, loading, token };
};

export { useProfile };

