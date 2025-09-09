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
  AuthService,
  ServerResponseError,
  LoginHelpValues,
  LoginValues,
  ServerResponse,
} from "../types";
import { HttpClient } from "../client";
import { parseIdentifier } from "../utils";
import { notifyVariant, paths } from "../data";
import { useNotification, useStore } from "../hooks";

export const useAuthService = (): AuthService => {
  const { VERIFY_CODE } = paths;
  const { ERROR } = notifyVariant;
  const { LOGIN_API, LOGOUT_API, LOGIN_HELP_API, LOGIN_SAVED_USER_API } =
    endpoints;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notify] = useNotification();
  const { setLoading, setServiceResponse } = useStore();
  const { user } = useAppSelector((state) => state.user);

  const login = async (values: LoginValues): Promise<void> => {
    const { reset, ...rest } = values;

    try {
      const { identifier, password, phonePrefix } = rest;
      const parsedIdentifier = parseIdentifier(identifier, phonePrefix);
      const payload = { ...parsedIdentifier, password };

      setLoading(true);

      const response = await HttpClient.post<ServerResponse>(
        LOGIN_API,
        payload
      );

      setLoading(false);

      const { error, data } = response;

      if (error) throw response;

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
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`login_error: ${JSON.stringify(error)}`);
      reset({ password: "" });
      setLoading(false);
      setServiceResponse({
        serviceError: true,
        serviceMessage: error.message,
        serviceMessageName: error.errorType,
      });
    }
  };

  const loginHelp = async (values: LoginHelpValues): Promise<void> => {
    const { action, toFormName, email, phoneNr, phonePrefix, reset } = values;

    try {
      const payload = phoneNr
        ? { action, email: "", phoneNr: `${phonePrefix}${phoneNr}` }
        : { action, email, phoneNr: "" };

      setLoading(true);

      const response = await HttpClient.post<ServerResponse>(
        LOGIN_HELP_API,
        payload
      );

      setLoading(false);

      const { error, message, data } = response;

      if (error) throw response;

      const { username } = data;
      const extra = JSON.parse(data.extra);
      const { firstName, lastName } = extra;

      const verifyCodeData = {
        username,
        email: email ? email : "",
        phoneNr: phoneNr ? `${phonePrefix}${phoneNr}` : "",
        fullname: `${firstName} ${lastName}`,
        toFormName,
        action,
      };

      setServiceResponse({
        serviceError: false,
        serviceSubmitting: true,
        serviceMessage: message,
      });
      navigate(VERIFY_CODE, { state: { verifyCodeData } });
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`login_help_error: ${JSON.stringify(error)}`);
      reset?.();
      setLoading(false);
      setServiceResponse({
        serviceError: true,
        serviceMessage: error.message,
        serviceMessageName: error.errorType,
      });
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
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`login_with_social_app_error: ${JSON.stringify(error)}`);
      throw error;
    }
  };

  const loginWithSavedUser = async (): Promise<void> => {
    try {
      setLoading(true);

      const response =
        await HttpClient.get<ServerResponse>(LOGIN_SAVED_USER_API);

      setLoading(false);

      const { error, data } = response;

      if (error) throw response;

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
    } catch (err) {
      const error = err as ServerResponseError;
      setLoading(false);
      notify({
        variant: ERROR,
        description: error.message || "Login failed, try again later",
      });

      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await HttpClient.get<ServerResponse>(LOGOUT_API);

      dispatch(setAToken(null));
      dispatch(setRToken(null));
      // dispatch(setUser(null));
      dispatch(setUserLastLogin({ id: user.id, lastLogin: user.lastLogin }));
      dispatch(setIsAuthenticated(false));

      localStorage.removeItem("atoken");
      localStorage.removeItem("user");
      localStorage.removeItem("rtoken");
      // localStorage.removeItem("lastLocation");
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`logout_error: ${JSON.stringify(error)}`);
      notify({
        variant: ERROR,
        description: "Log out failed",
      });

      throw error;
    }
  };

  return {
    login,
    logout,
    loginWithSocialApp,
    loginHelp,
    loginWithSavedUser,
  };
};
