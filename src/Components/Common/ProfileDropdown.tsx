import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { createSelector } from "reselect";

import avatar1 from "../../assets/images/users/avatar-1.jpg";
import { LogoutAction } from "../../slices/thunks";

const ProfileDropdown = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const profiledropdownData = createSelector(
    (state: any) => state.Profile,
    (profile) => profile.user
  );
  const user = useSelector(profiledropdownData);

  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
  }, [user]);

  // Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  const logout = () => {

    dispatch(LogoutAction()).then((res: any) => {
      if (res.type === "auth/logout/fulfilled") {
        navigate("/login");
        toast("Logout successful", {
          position: "top-right",
          hideProgressBar: false,
          className: "bg-success text-white",
          progress: undefined,
          toastId: "",
        });
        sessionStorage.removeItem("authUser");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    });

  };

  return (
    <Dropdown
      isOpen={isProfileDropdown}
      toggle={toggleProfileDropdown}
      className="ms-sm-3 header-item topbar-user"
    >
      <DropdownToggle tag="button" type="button" className="btn">
        <span className="d-flex align-items-center">
          <img
            className="rounded-circle header-profile-user"
            src={avatar1}
            alt="Header Avatar"
          />
          <span className="text-start ms-xl-2">
            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
              {userName}
            </span>
            <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
              Founder
            </span>
          </span>
        </span>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end">
        <h6 className="dropdown-header">Welcome {userName}!</h6>
        <DropdownItem className="p-0">
          <Link to="/profile" className="dropdown-item">
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
            <span className="align-middle">Profile</span>
          </Link>
        </DropdownItem>
        <DropdownItem className="p-0">
          <Link to="/apps-chat" className="dropdown-item">
            <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Messages</span>
          </Link>
        </DropdownItem>
        <DropdownItem className="p-0">
          <Link to="#" className="dropdown-item">
            <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Taskboard</span>
          </Link>
        </DropdownItem>
        <DropdownItem className="p-0">
          <Link to="/pages-faqs" className="dropdown-item">
            <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Help</span>
          </Link>
        </DropdownItem>
        <div className="dropdown-divider"></div>
        <DropdownItem className="p-0">
          <Link to="/pages-profile" className="dropdown-item">
            <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">
              Balance : <b>$5971.67</b>
            </span>
          </Link>
        </DropdownItem>
        <DropdownItem className="p-0">
          <Link to="/pages-profile-settings" className="dropdown-item">
            <span className="badge bg-success-subtle text-success mt-1 float-end">
              New
            </span>
            <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Settings</span>
          </Link>
        </DropdownItem>
        <DropdownItem className="p-0">
          <Link to="/auth-lockscreen-basic" className="dropdown-item">
            <i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Lock screen</span>
          </Link>
        </DropdownItem>
        <DropdownItem className="p-0">
          <Link className="dropdown-item" onClick={logout} to={"/login"}>
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle" data-key="t-logout">
              Logout
            </span>
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileDropdown;
