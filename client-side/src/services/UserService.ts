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
  const { DISCOVER, VERIFY_CODE, LOGIN, RESET_PASSWORD } = paths;
  const { ERROR, SUCCESS } = notifyVariant;
  const {
    CREATE_ACCOUNT_API,
    GET_USER_DETAILS_API,
    SAVE_AUTH_USER_API,
    VERIFY_ACCOUNT_API,
    VERIFY_CODE_API,
    RESEND_CODE_API,
  } = userEndpoints;

  const { setLoading, setServiceResponse } = useStore();
  const [notify] = useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);

  const createAccount = async (values: CreateAccountValues): Promise<void> => {
    const { identifier, phonePrefix, reset, ...rest } = values;

    try {
      const parsedIdentifier = parseIdentifier(identifier, phonePrefix);
      const payload = { ...parsedIdentifier, ...rest };

      setLoading(true);

      const response = await HttpClient.post<ServerResponse>(
        CREATE_ACCOUNT_API,
        payload
      );

      setLoading(false);

      const { error, message } = response;

      if (error) throw response;

      notify({
        variant: SUCCESS,
        description: `${message}`,
      });

      const verifyCodeData = {
        username: payload.username,
        toFormName: "verify-account",
      };

      navigate(VERIFY_CODE, { state: { verifyCodeData } });
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`create_account_error: ${JSON.stringify(error)}`);
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
        rest
      );

      setLoading(false);

      const { error, message } = response;

      if (error) throw response;

      notify({
        variant: SUCCESS,
        description: message,
      });

      navigate(LOGIN);
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`verify_account_error: ${JSON.stringify(error)}`);
      reset();
      setLoading(false);
      notify({
        variant: SUCCESS,
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
        rest
      );

      setLoading(false);

      const { error, message } = response;

      if (error) throw response;

      setServiceResponse({
        serviceError: false,
        serviceSubmitting: true,
        serviceMessage: message,
      });

      navigate(RESET_PASSWORD, { state: { toFormName } });
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`verify_code_error: ${JSON.stringify(error)}`);
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
        values
      );

      setLoading(false);

      const { error, message } = response;

      if (error) throw response;

      // notify({
      //   variant: SUCCESS,
      //   description: message,
      // });
      setServiceResponse({
        serviceError: false,
        // serviceSubmitting: true,
        serviceMessage: message,
      });
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`resend_code_error: ${JSON.stringify(error)}`);
      setLoading(false);
      setServiceResponse({
        serviceError: true,
        serviceMessage: error.message,
        serviceMessageName: error.errorType,
      });
    }
  };

  const getUsers = async () => {};

  const getUserDetails = async () => {
    try {
      const userId = user?.id;
      if (!userId) throw new Error("User ID is not available");

      setLoading(true);

      const response = await HttpClient.get<ServerResponse>(
        `${GET_USER_DETAILS_API}/${userId}`
      );

      setLoading(false);

      const { error, data } = response;

      if (error) throw response;

      data.extra = {
        ...JSON.parse(data.extra),
      };

      dispatch(setUser(data));
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`get_user_details_error: ${JSON.stringify(error)}`);
      setLoading(false);
      notify({
        variant: ERROR,
        description: error.message,
      });

      throw error;
    }
  };

  const saveAuthUser = async (values: any): Promise<void> => {
    try {
      const response = await HttpClient.post<any>(SAVE_AUTH_USER_API, values);

      const { error, data } = response;

      if (error) throw response;

      const { saveAuthUserToken } = data;
      data.user.extra = {
        ...JSON.parse(data.user.extra),
      };

      const { id, username, email, extra } = data.user;
      const { avatar } = extra;

      dispatch(setRemember(true));
      dispatch(
        setSavedAuthUser({
          id,
          username,
          email,
          photo: avatar,
          saveAuthUserToken,
        })
      );

      navigate(DISCOVER);
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`save_auth_user_error: ${JSON.stringify(error)}`);
      notify({
        variant: ERROR,
        description: error.message,
      });
    }
  };

  const confirmUser = async () => {};

  const editUser = async () => {};

  const exportUsers = async () => {};

  const dowbloadFile = async () => {};

  return {
    createAccount,
    verifyAccount,
    verifyCode,
    resendCode,
    getUsers,
    editUser,
    confirmUser,
    exportUsers,
    dowbloadFile,
    saveAuthUser,
    getUserDetails,
  };
};
