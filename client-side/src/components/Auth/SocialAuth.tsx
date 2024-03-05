import { FunctionComponent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthService from "../../services/AuthService";
import { useAuth } from "../../hooks";

const SocialAuth: FunctionComponent = () => {
    const { socialAuth } = useAuthService();
    const { isAuthenticated } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const tokenParam = location.search;

    useEffect(() => {
        const fetchData = async () => {
            await socialAuth(tokenParam);
        };
        fetchData();
    }, [socialAuth, tokenParam]);

    return (
        <>
            {isAuthenticated ? navigate("/discover") : navigate("/login")}
        </>
    );
};

export default SocialAuth;
