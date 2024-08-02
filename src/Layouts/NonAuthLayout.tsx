import { useEffect } from 'react';
import withRouter from '../Components/Common/withRouter';

//redux
import { useProfile } from 'Components/Hooks/UserHooks';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createSelector } from 'reselect';

const NonAuthLayout = ({ children }: any) => {
    const { userProfile, loading, token } = useProfile();
    const navigate = useNavigate();

    const nonauthData = createSelector(
        (state) => state.Layout,
        (layoutModeType) => layoutModeType.layoutModeType
    );
    // Inside your component
    const layoutModeType = useSelector(nonauthData);

    useEffect(() => {
        if (userProfile && token) {
            navigate("/dashboard"); // Redirect to dashboard if already logged in
        }
    }, [userProfile, token, navigate]);

    useEffect(() => {
        if (layoutModeType === "dark") {
            document.body.setAttribute("data-bs-theme", "dark");
        } else {
            document.body.setAttribute("data-bs-theme", "light");
        }
        return () => {
            document.body.removeAttribute("data-bs-theme");
        };
    }, [layoutModeType]);
    return (
        <div>
            {children}
        </div>
    );
};

export default withRouter(NonAuthLayout);