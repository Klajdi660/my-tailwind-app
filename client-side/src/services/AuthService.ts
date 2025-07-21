import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { endpoints } from "./Api";
import {
  setUser,
  setAToken,
  setRToken,
  useAppSelector,
  setUserLastLogin,
  setIsAuthenticated,
} from "../store";
import {
  AuthService,
  AuthResponse,
  LoginValues,
  RegisterResponse,
  RegisterUserValues,
  LoginHelpValues,
  VerifyCodeValues,
} from "../types";
import { paths } from "../data";
import { HttpClient } from "../client";
import { parseIdentifier } from "../utils";
import { useAuth, useNotification, useStore } from "../hooks";

const {
  LOGIN_API,
  LOGOUT_API,
  REGISTER_API,
  VERIFY_EMAIL_API,
  RESET_PASSWORD_API,
  FORGOT_PASSWORD_API,
  LOGIN_SAVED_USER_API,
} = endpoints;

export const useAuthService = (): AuthService => {
  const { VERIFY_CODE, LOGIN } = paths;

  const { setErrorResponse } = useAuth();
  const { setLoading } = useStore();
  const [notify] = useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useAppSelector((state) => state.user);

  const login = async (values: LoginValues): Promise<void> => {
    try {
      const { identifier, password, phonePrefix } = values;
      const parsedIdentifier = parseIdentifier(identifier, phonePrefix);
      const payload = { ...parsedIdentifier, password };

      setLoading(true);

      const loginResp = await HttpClient.post<AuthResponse>(LOGIN_API, payload);

      setLoading(false);

      const { error, data } = loginResp;
      if (error) throw loginResp;

      const { aToken, rToken, user } = data;
      user.extra = {
        ...JSON.parse(user.extra),
      };

      dispatch(setAToken(aToken));
      dispatch(setRToken(rToken));
      dispatch(setUser(user));
      dispatch(setIsAuthenticated(true));
      // dispatch(setUserLastLogin({ id: user.id, lastLogin: user.lastLogin }));

      localStorage.setItem("atoken", aToken);
      localStorage.setItem("rtoken", rToken);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error: any) {
      setLoading(false);
      setErrorResponse({
        error: true,
        errorType: error.errorType,
        errorMessage: error.message,
      });
      // notify({
      //   variant: "error",
      //   description: error.message,
      // });
      throw error;
    }
  };

  const loginWithSocialApp = async (tokenParam: string) => {
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
      dispatch(setIsAuthenticated(true));

      localStorage.atoken = aToken;
      localStorage.rtoken = rToken;
      localStorage.user = JSON.stringify(user);
    } catch (error) {
      console.error(`SocialAuth login failed: ${error}`);
      throw error;
    }
  };

  const loginWithSavedUser = async (): Promise<void> => {
    try {
      setLoading(true);

      const loginSavedUserResp =
        await HttpClient.get<AuthResponse>(LOGIN_SAVED_USER_API);

      setLoading(false);

      const { error, message, data } = loginSavedUserResp;
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

      dispatch(setAToken(aToken));
      dispatch(setRToken(rToken));
      dispatch(setUser(user));
      dispatch(setIsAuthenticated(true));
      // dispatch(setUserLastLogin({ id: user.id, lastLogin: user.lastLogin }));

      localStorage.atoken = aToken;
      localStorage.rtoken = rToken;
      localStorage.user = JSON.stringify(user);
    } catch (error) {
      setLoading(false);
      notify({
        variant: "error",
        description: "Login failed. Try again later.",
      });
      console.error(`Login failed: ${error}`);
      throw error;
    }
  };

  const register = async (values: RegisterUserValues): Promise<void> => {
    try {
      setLoading(true);

      const { identifier, phonePrefix, ...rest } = values;
      const parsedIdentifier = parseIdentifier(identifier, phonePrefix);
      const payload = { ...parsedIdentifier, ...rest };

      const registerResp = await HttpClient.post<RegisterResponse>(
        REGISTER_API,
        payload
      );

      setLoading(false);

      const { error, message } = registerResp;

      if (error) throw registerResp;

      notify({
        variant: "success",
        description: `${message}`,
      });

      const verifyCodeData = {
        ...payload,
        nameForm: "verify-account",
      };

      navigate(VERIFY_CODE, { state: { verifyCodeData } });
    } catch (error: any) {
      setErrorResponse({
        error: true,
        errorType: error.errorType,
        errorMessage: error.message,
      });
      setLoading(false);
      console.error(`Signup failed: ${error}`);
      throw error;
    }
  };

  const verifyCode = async (values: VerifyCodeValues): Promise<void> => {
    try {
      // setLoading(true);

      const verifyEmailResp = await HttpClient.post<AuthResponse>(
        VERIFY_EMAIL_API,
        values
      );

      // setLoading(false);

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

      navigate(LOGIN);
    } catch (error) {
      // setLoading(false);
      console.error(`Verify email failed: ${error}`);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await HttpClient.get<AuthResponse>(LOGOUT_API);

      dispatch(setAToken(null));
      dispatch(setRToken(null));
      // dispatch(setUser(null));
      dispatch(setUserLastLogin({ id: user.id, lastLogin: user.lastLogin }));
      dispatch(setIsAuthenticated(false));

      localStorage.removeItem("atoken");
      localStorage.removeItem("user");
      localStorage.removeItem("rtoken");
      // localStorage.removeItem("lastLocation");
    } catch (error) {
      notify({
        variant: "error",
        description: "Logout failed.",
      });
      console.error(`Logout failed: ${error}`);
      throw error;
    }
  };

  const loginHelp = async (values: LoginHelpValues): Promise<void> => {
    try {
      const { email, phoneNumber, phonePrefix } = values;

      const payload = phoneNumber
        ? { email: "", phoneNumber: `${phonePrefix}${phoneNumber}` }
        : { email, phoneNumber: "" };

      const forgotPasswordResp = await HttpClient.post<AuthResponse>(
        FORGOT_PASSWORD_API,
        payload
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
      const url = `${RESET_PASSWORD_API}?${params}`;

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

      navigate(LOGIN);
    } catch (error) {
      console.error(`Reset password failed: ${error}`);
      throw error;
    }
  };

  return {
    login,
    logout,
    register,
    loginWithSocialApp,
    verifyCode,
    resetPassword,
    loginHelp,
    loginWithSavedUser,
  };
};
