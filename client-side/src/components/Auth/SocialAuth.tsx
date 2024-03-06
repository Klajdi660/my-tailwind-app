import { FunctionComponent, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import useAuthService from "../../services/AuthService";
import { useAuth } from "../../hooks";

const SocialAuth: FunctionComponent = () => {
    const { socialAuth } = useAuthService();
    const { isAuthenticated } = useAuth();

    const location = useLocation();

    const tokenParam = location.search;

    useEffect(() => {
        const fetchData = async () => {
            await socialAuth(tokenParam);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenParam]);

    return (
        <>
            {isAuthenticated ? <Navigate to="/discover" /> : <Navigate to="/login" />}
        </>
    );
};

export default SocialAuth;
