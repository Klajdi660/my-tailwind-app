import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { HttpClient } from "../client";
// import { globalObject } from "../utils";
import { endpoints } from "./Api";
import { useNotification } from "../hooks";
import {
  AuthResponse,
  LoginUserInput,
  RegisterUserInput,
  ForgotPasswordInput,
  AuthService,
  RegisterResponse,
} from "../types";
import { paths } from "../data";

const {
  LOGIN_API,
  LOGOUT_API,
  REGISTER_API,
  VERIFY_EMAIL_API,
  FORGOTPASSWORD_API,
  RESETPASSWORD_API,
} = endpoints;

export const useAuthService = (): AuthService => {
  const { discover } = paths;

  const { authenticateUser, unAuthenticateUser /*setLToken*/ } = useAuth();
  const [notify] = useNotification();
  const navigate = useNavigate();

  const login = async (values: LoginUserInput): Promise<void> => {
    try {
      const loginResp = await HttpClient.post<AuthResponse>(LOGIN_API, values);

      const { error, message, data } = loginResp;

      if (error) {
        notify({
          title: "Error",
          variant: "error",
          description: message,
        });
        return;
      }

      const { aToken } = data;
      const user = JSON.parse(atob(aToken.split(".")[1]));
      localStorage.atoken = aToken;
      localStorage.user = JSON.stringify(user);
      // setLToken(loginResp.lToken);
      // globalObject.lToken = loginResp.lToken;
      authenticateUser({ id: user.id });
      navigate(`${discover}`);
    } catch (error) {
      notify({
        title: "Error",
        variant: "error",
        description: "Login failed. Incorrect email/username or password",
      });
      console.error(`Login failed: ${error}`);
      throw error;
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

  const register = async (values: RegisterUserInput): Promise<void> => {
    try {
      const registerResp = await HttpClient.post<RegisterResponse>(
        REGISTER_API,
        values
      );

      const { error, message, data } = registerResp;

      if (error) {
        notify({
          title: "Error",
          variant: "error",
          description: message,
        });
        return;
      }

      notify({
        title: "Success",
        variant: "success",
        description: `${message}`,
      });

      const registerData = { ...values, codeExpire: data.codeExpire };

      navigate("/verify-email", { state: { registerData } });
    } catch (error) {
      console.error(`Signup failed: ${error}`);
      throw error;
    }
  };

  const verifyEmail = async (values: any): Promise<void> => {
    try {
      const verifyEmailResp = await HttpClient.post<AuthResponse>(
        VERIFY_EMAIL_API,
        values
      );

      const { error, message } = verifyEmailResp;

      if (error) {
        notify({
          title: "Error",
          variant: "error",
          description: message,
        });
        return;
      }

      notify({
        title: "Success",
        variant: "success",
        description: message,
      });

      navigate("/login");
    } catch (error) {
      console.error(`Verify email failed: ${error}`);
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
      throw error;
    }
  };

  const forgotPassword = async (values: ForgotPasswordInput): Promise<void> => {
    try {
      const forgotPasswordResp = await HttpClient.post<AuthResponse>(
        FORGOTPASSWORD_API,
        values
      );

      const { error, message } = forgotPasswordResp;

      if (error) {
        notify({
          title: "Error",
          variant: "error",
          description: message,
        });
        return;
      }

      notify({
        title: "Success",
        variant: "info",
        description: message,
      });

      // navigate("/password-code", { state: { passData: values } });
    } catch (error) {
      console.error(`Forgot Pass Failed: ${error}`);
      throw error;
    }
  };

  const resetPassword = async (
    values: any,
    email: string,
    hash: string
  ): Promise<void> => {
    try {
      const resetPasswordResp = await HttpClient.post<AuthResponse>(
        `${RESETPASSWORD_API}/${email}/${hash}`,
        values
      );

      const { error, message } = resetPasswordResp;

      if (error) {
        notify({
          title: "Error",
          variant: "error",
          description: message,
        });
        return;
      }

      notify({
        title: "Success",
        variant: "info",
        description: message,
      });

      navigate("/login");
    } catch (error) {
      console.error(`Reset password failed: ${error}`);
      throw error;
    }
  };

  return {
    login,
    socialAuth,
    register,
    verifyEmail,
    logout,
    forgotPassword,
    resetPassword,
  };
};
