import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userEndpoints } from "./Api";
import { HttpClient } from "../client";
import { UserDetailsResponse } from "../types";
import { useNotification, useStore } from "../hooks";
import {
  setUser,
  setRemember,
  useAppSelector,
  setSavedAuthUser,
} from "../store";
import { notifyVariant, paths } from "../data";

export const useUserService = () => {
  const { DISCOVER } = paths;
  const { ERROR } = notifyVariant;
  const { GET_USER_DETAILS_API, SAVE_AUTH_USER_API } = userEndpoints;

  const { setLoading } = useStore();
  const [notify] = useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);

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
    getUsers,
    editUser,
    confirmUser,
    exportUsers,
    dowbloadFile,
    saveAuthUser,
    getUserDetails,
  };
};
