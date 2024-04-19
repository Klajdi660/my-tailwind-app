import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { HttpClient } from "../client";
// import { globalObject } from "../utils";
import { endpoints } from "./Api";
import { useNotification } from "../hooks";
import { AuthResponse, RegisterUserInput } from "../types/user.type";
// import { toast } from "react-toastify";

import { paths } from "../constants";

const {
  LOGIN_API,
  LOGOUT_API,
  SIGNUP_API,
  FORGOTPASSWORD_API,
  RESETPASSWORD_API,
} = endpoints;

interface AuthService {
  login: (
    identifier: string,
    password: string,
    remember: boolean
  ) => Promise<void>;
  socialAuth: (tokenParam: string) => Promise<void>;
  signup: (values: RegisterUserInput) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: any, token: string) => Promise<void>;
}

const useAuthService = (): AuthService => {
  const { discover } = paths;

  const { authenticateUser, unAuthenticateUser /*setLToken*/ } = useAuth();
  const [notify] = useNotification();
  const navigate = useNavigate();

  const login = async (
    identifier: string,
    password: string,
    remember: boolean
  ): Promise<void> => {
    let data = { identifier, password, remember };

    try {
      const response = await HttpClient.post<AuthResponse>(LOGIN_API, data);

      // if (response.error) {
      //   notify({
      //     title: "Error",
      //     variant: "error",
      //     description: response.message,
      //   });
      //   return;
      // }

      const user = JSON.parse(atob(response.atoken.split(".")[1]));
      console.log("user 111:>> ", user);
      localStorage.atoken = response.atoken;
      localStorage.user = JSON.stringify(user);
      // setLToken(response.lToken);
      // globalObject.lToken = response.lToken;
      authenticateUser({ id: user.id });
      navigate(`/${discover}`);
    } catch (error) {
      notify({
        title: "Error",
        variant: "error",
        description: "Login failed. Incorrect email/username or password",
      });
      console.error(`Login failed: ${error}`);
    }
  };

  const socialAuth = async (tokenParam: string) => {
    try {
      const token = tokenParam
        .slice(tokenParam.indexOf("=") + 1)
        .replace("%20", " ");

      const user = JSON.parse(atob(token.split(".")[1]));

      localStorage.atoken = token;
      localStorage.user = JSON.stringify(user);
      authenticateUser({ id: user.id });
    } catch (error) {
      console.error(`SocialAuth login failed: ${error}`);
      throw error;
    }
  };

  const signup = async (values: RegisterUserInput): Promise<void> => {
    try {
      let data = { ...values };
      await HttpClient.post<AuthResponse>(SIGNUP_API, data);
      navigate(`/verify-email`);
    } catch (error) {
      console.error(`Signup failed: ${error}`);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await HttpClient.get<AuthResponse>(LOGOUT_API);
      unAuthenticateUser();
      delete localStorage.atoken;
      delete localStorage.user;
      delete localStorage.lastLocation;
      navigate("/");
    } catch (error) {
      notify({
        title: "Error",
        variant: "error",
        description: "Logout failed.",
      });
      console.error(`Logout failed: ${error}`);
    }
  };

  const forgotPassword = async (data: any): Promise<void> => {
    try {
      const response = await HttpClient.post<AuthResponse>(
        FORGOTPASSWORD_API,
        data
      );
      if (response.error) {
        notify({
          title: "Error",
          variant: "error",
          description: response.message,
        });
        return;
      }

      notify({
        title: "Success",
        variant: "info",
        description: response.message,
      });
      navigate("/password-code");
    } catch (error) {
      console.error(`Forgot Pass Failed: ${error}`);
    }
  };

  const resetPassword = async (data: any, token: string): Promise<void> => {
    try {
      const response = await HttpClient.put<AuthResponse>(
        `${RESETPASSWORD_API}/${token}`,
        data
      );
      if (response.error) {
        notify({
          title: "Error",
          variant: "error",
          description: response.message,
        });
        return;
      }

      notify({
        title: "Success",
        variant: "info",
        description: response.message,
      });
    } catch (error) {
      console.error(`Reset Pass Failed: ${error}`);
    }
  };

  return { login, socialAuth, signup, logout, forgotPassword, resetPassword };
};

export default useAuthService;
