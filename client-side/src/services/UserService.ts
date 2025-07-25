import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userEndpoints } from "./Api";
import { HttpClient } from "../client";
import {
  AuthResponse,
  CreateAccountValues,
  UserDetailsResponse,
  VerifyAccountValues,
  CreateAccountResponse,
  VerifyCodeValues,
  ResendCodeValues,
} from "../types";
import { useNotification, useStore } from "../hooks";
import {
  setRemember,
  setSavedAuthUser,
  setUser,
  useAppSelector,
} from "../store";
import { notifyVariant, paths } from "../data";
import { parseIdentifier } from "../utils";

export const useUserService = () => {
  const { DISCOVER, VERIFY_CODE, LOGIN } = paths;
  const { ERROR, SUCCESS } = notifyVariant;
  const {
    CREATE_ACCOUNT_API,
    GET_USER_DETAILS_API,
    SAVE_AUTH_USER_API,
    VERIFY_ACCOUNT_API,
    VERIFY_CODE_API,
    RESEND_CODE_API,
  } = userEndpoints;

  const { setLoading, setErrorResponse } = useStore();
  const [notify] = useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);

  const createAccount = async (values: CreateAccountValues): Promise<void> => {
    try {
      const { identifier, phonePrefix, ...rest } = values;
      const parsedIdentifier = parseIdentifier(identifier, phonePrefix);
      const payload = { ...parsedIdentifier, ...rest };

      setLoading(true);

      const createAccountResp = await HttpClient.post<CreateAccountResponse>(
        CREATE_ACCOUNT_API,
        payload
      );

      setLoading(false);

      const { error, message } = createAccountResp;

      if (error) throw createAccountResp;

      notify({
        variant: SUCCESS,
        description: `${message}`,
      });

      const verifyCodeData = {
        username: payload.username,
        toFormName: "verify-account",
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

  const verifyAccount = async (values: VerifyAccountValues): Promise<void> => {
    try {
      setLoading(true);

      const verifyAccountResp = await HttpClient.post<AuthResponse>(
        VERIFY_ACCOUNT_API,
        values
      );

      setLoading(false);

      const { error, message } = verifyAccountResp;

      if (error) throw verifyAccountResp;

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

  const verifyCode = async (values: VerifyCodeValues): Promise<void> => {
    try {
      setLoading(true);

      const verifyCodeResp = await HttpClient.post<AuthResponse>(
        VERIFY_CODE_API,
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
      setErrorResponse({
        error: true,
        errorType: error.errorType,
        errorMessage: error.message,
      });
      // notify({
      //   variant: SUCCESS,
      //   description: error.message,
      // });

      throw error;
    }
  };

  const resendCode = async (values: ResendCodeValues): Promise<void> => {
    try {
      setLoading(true);

      const resendCodeResp = await HttpClient.post<AuthResponse>(
        RESEND_CODE_API,
        values
      );

      setLoading(false);

      const { error, message } = resendCodeResp;

      if (error) throw resendCodeResp;

      notify({
        variant: SUCCESS,
        description: message,
      });
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

  const getUsers = async () => {};

  const getUserDetails = async () => {
    try {
      const userId = user?.id;
      if (!userId) throw new Error("User ID is not available");

      const url = `${GET_USER_DETAILS_API}/${userId}`;

      setLoading(true);

      const userDetailsResp = await HttpClient.get<UserDetailsResponse>(url);

      setLoading(false);

      const { error, data } = userDetailsResp;

      if (error) throw userDetailsResp;

      data.extra = {
        ...JSON.parse(data.extra),
      };

      dispatch(setUser(data));
    } catch (error: any) {
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
      const saveAuthUserResp = await HttpClient.post<any>(
        SAVE_AUTH_USER_API,
        values
      );

      const { error, data } = saveAuthUserResp;

      if (error) throw saveAuthUserResp;

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
    } catch (error: any) {
      notify({
        variant: ERROR,
        description: error.message,
      });

      throw error;
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
