import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userEndpoints } from "./Api";
import { HttpClient } from "../client";
import { UserDetailsResponse } from "../types";
import { useNotification, useStore } from "../hooks";
import {
  useAppSelector,
  setUser,
  setRemember,
  setSavedAuthUser,
} from "../store";
import { paths } from "../data";

const { GET_USER_DETAILS_API, SAVE_AUTH_USER_API } = userEndpoints;

export const useUserService = () => {
  const { discover } = paths;

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

      const { error, message, data } = userDetailsResp;

      if (error) {
        notify({
          variant: "error",
          description: message,
        });
      }

      data.extra = {
        ...JSON.parse(data.extra),
      };

      dispatch(setUser(data));
    } catch (error) {
      setLoading(false);
      console.error(`Get user details failed: ${error} `);
      throw error;
    }
  };

  const saveAuthUser = async (values: any): Promise<void> => {
    try {
      const { id, username, email, extra } = user;
      const { avatar } = extra;

      const saveAuthUserResp = await HttpClient.post<any>(
        SAVE_AUTH_USER_API,
        values
      );
      const { error, message, data } = saveAuthUserResp;
      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return;
      }

      const { saveAuthUserToken } = data;

      localStorage.saveAuthUserToken = saveAuthUserToken;

      // if (saveAuthUserData) {
      dispatch(setRemember(true));
      dispatch(setSavedAuthUser({ id, username, email, photo: avatar }));
      // }

      navigate(discover);
    } catch (error) {
      console.error(`Save auth user failed: ${error} `);
      throw error;
    }
  };

  const confirmUser = async () => {};

  const editUser = async () => {};

  const exportUsers = async () => {};

  const dowbloadFile = async () => {};

  return {
    getUsers,
    getUserDetails,
    confirmUser,
    editUser,
    exportUsers,
    dowbloadFile,
    saveAuthUser,
  };
};
