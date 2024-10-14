import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { endpoints } from "./Api";
import {
  AuthService,
  AuthResponse,
  LoginUserValues,
  RegisterResponse,
  RegisterUserValues,
  ForgotPasswordValues,
} from "../types";
import { paths } from "../data";
import { HttpClient } from "../client";
import { globalObject } from "../utils";
import { useAuth, useNotification, useStore } from "../hooks";
import {
  clearRememberMeData,
  saveRememberMeData,
  setAToken,
  setRToken,
  setUser,
  setLoading,
} from "../store";

const {
  LOGIN_API,
  LOGOUT_API,
  REGISTER_API,
  VERIFY_EMAIL_API,
  RESETPASSWORD_API,
  FORGOTPASSWORD_API,
  OAUTH_GOOGLE_CALLBACK_API,
} = endpoints;

export const useAuthService = (): AuthService => {
  const { discover } = paths;

  const { authenticateUser, unAuthenticateUser, setLToken } = useAuth();
  // const { setLoading } = useStore();
  const [notify] = useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (values: LoginUserValues): Promise<void> => {
    try {
      dispatch(setLoading(true));

      const loginResp = await HttpClient.post<AuthResponse>(LOGIN_API, values);

      dispatch(setLoading(false));

      const { error, message, data } = loginResp;
      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return;
      }

      const { aToken, rToken, user } = data;
      user.extra = {
        ...JSON.parse(user.extra),
      };
      // const user = JSON.parse(atob(aToken.split(".")[1]));

      const rtoken = JSON.parse(atob(rToken.split(".")[1]));

      dispatch(setAToken(aToken));
      dispatch(setRToken(rToken));
      dispatch(setUser(user));

      localStorage.atoken = aToken;
      localStorage.user = JSON.stringify(user);
      localStorage.rtoken = JSON.stringify(rtoken);

      // if (values.remember) {
      //   const rememberType = values.identifier.includes("@")
      //     ? "email"
      //     : "username";

      //   dispatch(
      //     saveRememberMeData({
      //       ...values,
      //       rememberType,
      //     })
      //   );
      // } else {
      //   dispatch(clearRememberMeData());
      // }

      // setLToken(aToken);
      // globalObject.lToken = data.aToken;
      // authenticateUser({ id: user.id });
      navigate(`${discover}`);
    } catch (error) {
      dispatch(setLoading(false));
      notify({
        variant: "error",
        description: "Login failed. Incorrect email/username or password",
      });
      console.error(`Login failed: ${error}`);
      throw error;
    }
  };

  const socialAuth = async (tokenParam: string) => {
    try {
      const query = new URLSearchParams(tokenParam);

      const tokens = query.get("token");
      const queryUser = query.get("user");

      const user = JSON.parse(queryUser || "");
      const token = JSON.parse(tokens || "");

      const { aToken, rToken } = token;

      user.extra = {
        ...JSON.parse(user.extra),
      };

      dispatch(setAToken(aToken));
      dispatch(setRToken(rToken));
      dispatch(setUser(user));

      localStorage.atoken = aToken;
      localStorage.rtoken = JSON.stringify(rToken);
      localStorage.user = JSON.stringify(user);

      // dispatch(clearRememberMeData());
    } catch (error) {
      console.error(`SocialAuth login failed: ${error}`);
      throw error;
    }
  };

  const register = async (values: RegisterUserValues): Promise<void> => {
    try {
      setLoading(true);

      const registerResp = await HttpClient.post<RegisterResponse>(
        REGISTER_API,
        values
      );

      setLoading(false);

      const { error, message, data } = registerResp;

      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return;
      }

      notify({
        variant: "success",
        description: `${message}`,
      });

      const registerData = { ...values, codeExpire: data.codeExpire };

      navigate("/verify-email", { state: { registerData } });
    } catch (error) {
      setLoading(false);
      console.error(`Signup failed: ${error}`);
      throw error;
    }
  };

  const verifyEmail = async (values: any): Promise<void> => {
    try {
      setLoading(true);

      const verifyEmailResp = await HttpClient.post<AuthResponse>(
        VERIFY_EMAIL_API,
        values
      );

      setLoading(false);

      const { error, message } = verifyEmailResp;

      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return;
      }

      notify({
        variant: "success",
        description: message,
      });

      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.error(`Verify email failed: ${error}`);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await HttpClient.get<AuthResponse>(LOGOUT_API);

      // unAuthenticateUser();

      dispatch(setAToken(null));
      dispatch(setRToken(null));
      dispatch(setUser(null));

      delete localStorage.atoken;
      delete localStorage.user;
      delete localStorage.rtoken;

      // delete localStorage.lastLocation;
      navigate("/");
    } catch (error) {
      notify({
        variant: "error",
        description: "Logout failed.",
      });
      console.error(`Logout failed: ${error}`);
      throw error;
    }
  };

  const forgotPassword = async (
    values: ForgotPasswordValues
  ): Promise<void> => {
    try {
      const forgotPasswordResp = await HttpClient.post<AuthResponse>(
        FORGOTPASSWORD_API,
        values
      );

      const { error, message } = forgotPasswordResp;

      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return;
      }

      notify({
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
      const params = new URLSearchParams({ email, hash }).toString();
      const url = `${RESETPASSWORD_API}?${params}`;

      const resetPasswordResp = await HttpClient.post<AuthResponse>(
        url,
        values
      );

      const { error, message } = resetPasswordResp;

      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return;
      }

      notify({
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
