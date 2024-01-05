import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { HttpClient } from "../client";
import { globalObject } from "../utils";
import { endpoints } from "./Api";
import { AuthResponse, RegisterUserInput } from "../types/user.type";
import { toast } from "react-toastify";
// import { path } from "../data";

const { LOGIN_API, LOGOUT_API, SIGNUP_API } = endpoints;
// const { verifyEmail } = path;

interface AuthService {
  login: (username: string, password: string) => Promise<void>;
  signup: (values: RegisterUserInput, accountType: string) => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthService = (): AuthService => {
  const { authenticateUser, unAuthenticateUser, setLToken } = useAuth();
  const navigate = useNavigate();

  const login = async (username: string, password: string): Promise<void> => {
    let data = { usernameOrEmail: username, password };

    try {
      const response = await HttpClient.post<AuthResponse>(LOGIN_API, data);

      if (response.error) {
        toast.error(response.message);
        return;
      }
      
      const user = JSON.parse(atob(response.rToken.split(".")[1]));
      localStorage.rToken = response.rToken;
      localStorage.user = JSON.stringify(user);
      setLToken(response.lToken);
      globalObject.lToken = response.lToken;
      authenticateUser({ id: user.id });
      navigate("/");
    } catch (error) {
      console.error(`Login failed: ${error}`);
      throw error;
    }
  };

  const signup = async (values: RegisterUserInput, accountType: string): Promise<void> => {
    try {
      let data = { ...values, accountType };
      const response = await HttpClient.post<AuthResponse>(SIGNUP_API, data);
      console.log('response :>> ', response);
      navigate(`/verify-email`);
    } catch (error) {
      console.error(`Signup failed: ${error}`);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await HttpClient.post<AuthResponse>(LOGOUT_API);
      unAuthenticateUser();
      delete localStorage.rToken;
      delete localStorage.user;
      // toast.success("Logout Success")
      navigate("/");
    } catch (error) {
      console.error(`Logout failed: ${error}`);
      throw error;
    }
  };

  return { login, signup, logout };
};

export default useAuthService;
