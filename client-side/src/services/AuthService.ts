import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { HttpClient } from "../client";
import { globalObject } from "../utils";
import { endpoints } from "./Api";
import { AuthResponse } from "../types/user.type";
import { toast } from "react-toastify";

const { LOGIN_API, LOGOUT_API } = endpoints;

interface AuthService {
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthService = (): AuthService => {
  const { authenticateUser, unAuthenticateUser, setLToken } = useAuth();
  const navigate = useNavigate();

  const login = async (username: string, password: string): Promise<void> => {
    let data = { usernameOrEmail: username, password };

    try {
      const response = await HttpClient.post<AuthResponse>(LOGIN_API, data) as any;
      if (response.error) {
        toast.error(response.message);
      } else {
        const user = JSON.parse(atob(response.rToken.split(".")[1]));
        localStorage.rToken = response.rToken;
        localStorage.user = JSON.stringify(user);
        setLToken(response.lToken);
        globalObject.lToken = response.lToken;
        authenticateUser({ id: user.id });
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await HttpClient.post<AuthResponse>(LOGOUT_API);
      unAuthenticateUser();
      delete localStorage.rToken;
      delete localStorage.user;
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return { login, logout };
};

export default useAuthService;
