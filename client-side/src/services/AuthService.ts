import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { endpoints } from "./Api";
import {
  setAToken,
  setIsAuthenticated,
  setRToken,
  setUser,
  setUserLastLogin,
  useAppSelector,
} from "../store";
import {
  AuthResponse,
  AuthService,
  LoginHelpValues,
  LoginValues,
  VerifyCodeValues,
} from "../types";
import { notifyVariant, paths } from "../data";
import { HttpClient } from "../client";
import { parseIdentifier } from "../utils";
import { useAuth, useNotification, useStore } from "../hooks";

export const useAuthService = (): AuthService => {
  const {
    LOGIN_API,
    LOGOUT_API,
    LOGIN_HELP_API,
    VERIFY_ACCOUNT_API,
    RESET_PASSWORD_API,
    LOGIN_SAVED_USER_API,
  } = endpoints;
  const { VERIFY_CODE, LOGIN } = paths;
  const { ERROR, SUCCESS, INFO } = notifyVariant;

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

      throw error;
    }
  };

  const loginHelp = async (values: LoginHelpValues): Promise<void> => {
    try {
      const { email, phoneNr, phonePrefix } = values;

      const payload = phoneNr
        ? { email: "", phoneNr: `${phonePrefix}${phoneNr}` }
        : { email, phoneNr: "" };

      setLoading(true);

      const loginHelpResp = await HttpClient.post<AuthResponse>(
        LOGIN_HELP_API,
        payload
      );

      setLoading(false);

      const { error, message, data } = loginHelpResp;

      if (error) throw loginHelpResp;

      notify({
        variant: SUCCESS,
        description: message,
      });

      const verifyCodeData = {
        ...payload,
        username: data.username,
        toFormName: "verify_user",
      };

      navigate(VERIFY_CODE, { state: { verifyCodeData } });
    } catch (error: any) {
      setLoading(false);
      setErrorResponse({
        error: true,
        errorType: error.errorType,
        errorMessage: error.message,
      });

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
      throw error;
    }
  };

  const loginWithSavedUser = async (): Promise<void> => {
    try {
      setLoading(true);

      const loginSavedUserResp =
        await HttpClient.get<AuthResponse>(LOGIN_SAVED_USER_API);

      setLoading(false);

      const { error, data } = loginSavedUserResp;

      if (error) throw loginSavedUserResp;

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
    } catch (error: any) {
      setLoading(false);
      notify({
        variant: ERROR,
        description: error.message || "Login failed, try again later",
      });

      throw error;
    }
  };

  const verifyCode = async (values: VerifyCodeValues): Promise<void> => {
    try {
      setLoading(true);

      const verifyCodeResp = await HttpClient.post<AuthResponse>(
        VERIFY_ACCOUNT_API,
        values
      );

      setLoading(false);

      const { error, message } = verifyCodeResp;

      if (error) throw verifyCodeResp;

      notify({
        variant: SUCCESS,
        description: message,
      });

      navigate(LOGIN);
    } catch (error: any) {
      setLoading(false);
      notify({
        variant: SUCCESS,
        description: error.message,
      });

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
        variant: ERROR,
        description: "Log out failed",
      });

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

      setLoading(true);

      const resetPasswordResp = await HttpClient.post<AuthResponse>(
        `${RESET_PASSWORD_API}?${params}`,
        values
      );

      setLoading(false);

      const { error, message } = resetPasswordResp;

      if (error) throw resetPasswordResp;

      notify({
        variant: INFO,
        description: message,
      });

      navigate(LOGIN);
    } catch (error: any) {
      setLoading(false);
      notify({ variant: ERROR, description: error.message });
      throw error;
    }
  };

  return {
    login,
    logout,
    loginWithSocialApp,
    verifyCode,
    resetPassword,
    loginHelp,
    loginWithSavedUser,
  };
};
