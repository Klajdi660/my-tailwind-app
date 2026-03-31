import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userEndpoints } from "./Api";
import {
  setRemember,
  setSavedAuthUser,
  setUser,
  useAppSelector,
} from "../store";
import {
  CreateAccountValues,
  VerifyAccountValues,
  VerifyCodeValues,
  ResendCodeValues,
  ServerResponse,
  ServerResponseError,
} from "../types";
import { HttpClient } from "../client";
import { parseIdentifier } from "../utils";
import { notifyVariant, paths } from "../data";
import { useNotification, useStore } from "../hooks";

export const useUserService = () => {
  const {
    CREATE_ACCOUNT_API,
    GET_USER_DETAILS_API,
    SAVE_AUTH_USER_API,
    VERIFY_ACCOUNT_API,
    VERIFY_CODE_API,
    RESEND_CODE_API,
    RESET_PASSWORD_API,
  } = userEndpoints;
  const { DISCOVER, VERIFY_CODE, LOGIN, RESET_PASSWORD } = paths;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notify] = useNotification();
  const { setLoading, setServiceResponse } = useStore();
  const { user } = useAppSelector((state) => state.user);

  const createAccount = async (values: CreateAccountValues): Promise<void> => {
    const { identifier, phonePrefix, reset, ...rest } = values;

    try {
      const parsedIdentifier = parseIdentifier(identifier, phonePrefix);
      const payload = { ...parsedIdentifier, ...rest };

      setLoading(true);

      const response = await HttpClient.post<ServerResponse>(
        CREATE_ACCOUNT_API,
        payload,
      );

      setLoading(false);

      if (response.error) throw response;

      notify({
        variant: notifyVariant.SUCCESS,
        description: `${response.message}`,
      });

      const verifyCodeData = {
        username: payload.username,
        toFormName: "verify-account",
      };

      navigate(VERIFY_CODE, { state: { verifyCodeData } });
    } catch (err) {
      const error = err as ServerResponseError;
      reset();
      setLoading(false);
      setServiceResponse({
        serviceError: true,
        serviceMessage: error.message,
        serviceMessageName: error.errorType,
      });
    }
  };

  const verifyAccount = async (values: VerifyAccountValues): Promise<void> => {
    const { reset, ...rest } = values;

    try {
      setLoading(true);

      const response = await HttpClient.post<ServerResponse>(
        VERIFY_ACCOUNT_API,
        rest,
      );

      setLoading(false);

      if (response.error) throw response;

      setServiceResponse({});

      notify({
        variant: notifyVariant.SUCCESS,
        description: response.message,
      });

      navigate(LOGIN);
    } catch (err) {
      const error = err as ServerResponseError;
      reset();
      setLoading(false);
      notify({
        variant: notifyVariant.ERROR,
        description: error.message,
      });
    }
  };

  const verifyCode = async (values: VerifyCodeValues): Promise<void> => {
    const { toFormName, reset, ...rest } = values;

    try {
      setLoading(true);

      const response = await HttpClient.post<ServerResponse>(
        VERIFY_CODE_API,
        rest,
      );

      setLoading(false);

      if (response.error) throw response;

      setServiceResponse({});

      navigate(RESET_PASSWORD, {
        state: { toFormName, username: rest.username },
      });
    } catch (err) {
      const error = err as ServerResponseError;
      reset();
      setLoading(false);
      setServiceResponse({
        serviceError: true,
        serviceMessage: error.message,
        serviceMessageName: error.errorType,
      });
    }
  };

  const resendCode = async (values: ResendCodeValues): Promise<void> => {
    try {
      setLoading(true);

      const response = await HttpClient.post<ServerResponse>(
        RESEND_CODE_API,
        values,
      );

      setLoading(false);

      if (response.error) throw response;

      setServiceResponse({
        serviceError: false,
        serviceSubmitting: true,
        serviceMessage: response.message,
      });
    } catch (err) {
      const error = err as ServerResponseError;
      setLoading(false);
      setServiceResponse({
        serviceError: true,
        serviceMessage: error.message,
        serviceMessageName: error.errorType,
      });
    }
  };

  const resetPassword = async (values: any): Promise<void> => {
    try {
      setLoading(true);

      const response = await HttpClient.post<ServerResponse>(
        RESET_PASSWORD_API,
        values,
      );

      setLoading(false);

      if (response.error) throw response;

      notify({
        variant: notifyVariant.INFO,
        description: response.message,
      });

      navigate(LOGIN);
    } catch (err) {
      const error = err as ServerResponseError;
      setLoading(false);
      notify({ variant: notifyVariant.ERROR, description: error.message });
    }
  };

  const getUserDetails = async () => {
    try {
      const userId = user?.id;
      if (!userId) throw new Error("User ID is not available");

      setLoading(true);

      const response = await HttpClient.get<ServerResponse>(
        `${GET_USER_DETAILS_API}/${userId}`,
      );

      setLoading(false);

      if (response.error) throw response;

      response.data.extra = {
        ...JSON.parse(response.data.extra),
      };

      dispatch(setUser(response.data));
    } catch (err) {
      const error = err as ServerResponseError;
      setLoading(false);
      notify({
        variant: notifyVariant.ERROR,
        description: error.message,
      });

      throw error;
    }
  };

  const saveAuthUser = async (values: any): Promise<void> => {
    try {
      const response = await HttpClient.post<any>(SAVE_AUTH_USER_API, values);

      if (response.error) throw response;

      const { saveAuthUserToken } = response.data;
      response.data.user.extra = {
        ...JSON.parse(response.data.user.extra),
      };

      const { id, username, email, extra } = response.data.user;
      const { avatar } = extra;

      dispatch(setRemember(true));
      dispatch(
        setSavedAuthUser({
          id,
          username,
          email,
          photo: avatar,
          saveAuthUserToken,
        }),
      );

      navigate(DISCOVER);
    } catch (err) {
      const error = err as ServerResponseError;
      notify({
        variant: notifyVariant.ERROR,
        description: error.message,
      });
    }
  };

  return {
    verifyCode,
    resendCode,
    saveAuthUser,
    createAccount,
    verifyAccount,
    resetPassword,
    getUserDetails,
  };
};
