import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { profileEndpoints } from "./Api";
import { HttpClient } from "../client";
import { useAuth, useNotification, useStore } from "../hooks";
import {
  updateRememberMeData,
  setIsAccountDelete,
  setAccountDeleteDaysDifference,
} from "../store";
import {
  ChangePasswordInput,
  DeleteProfileInput,
  EditProfileInput,
  UserDetailsResponse,
} from "../types";

const {
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
  CANCEL_DELETION_ACCOUNT_API,
} = profileEndpoints;

export const useProfileService = () => {
  const { setUser } = useAuth();
  const { setLoading } = useStore();
  const [notify] = useNotification();
  const dispatch = useDispatch();
  const rememberMe = useSelector((state: any) => state.rememberMe);

  const updateProfile = async (values: EditProfileInput): Promise<void> => {
    try {
      setLoading(true);

      const profileDetailsResp = await HttpClient.put<UserDetailsResponse>(
        UPDATE_PROFILE_API,
        values
      );

      setLoading(false);

      const { error, message, data } = profileDetailsResp;
      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return;
      }

      data.extra = {
        ...JSON.parse(data.extra),
      };

      setUser(data);

      if (data.username) {
        dispatch(
          updateRememberMeData({
            identifier: data.username,
            password: rememberMe.password,
          })
        );
      }

      notify({
        variant: "success",
        description: message,
      });
    } catch (error) {
      setLoading(false);
      console.error(`Get user details failed: ${error} `);
      throw error;
    }
  };

  const updateDisplayPicture = async () => {};

  const deleteProfile = async (values: DeleteProfileInput) => {
    try {
      setLoading(true);

      const deleteProfileResp = await HttpClient.post<UserDetailsResponse>(
        DELETE_PROFILE_API,
        values
      );

      setLoading(false);

      const { error, message, data } = deleteProfileResp;
      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return;
      }

      dispatch(setIsAccountDelete({ isAccountDelete: true }));
      dispatch(
        setAccountDeleteDaysDifference({
          accoundDeleteDaysDifference: data.daysDifference,
        })
      );
      notify({
        variant: "success",
        description: message,
      });
    } catch (error) {
      setLoading(false);
      console.error(`Delete user failed: ${error} `);
      throw error;
    }
  };

  const cancelDeleteProfile = async () => {
    try {
      setLoading(true);

      const cancelDeleteProfileResp =
        await HttpClient.post<UserDetailsResponse>(CANCEL_DELETION_ACCOUNT_API);

      setLoading(false);

      const { error, message, data } = cancelDeleteProfileResp;
      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return;
      }

      dispatch(setIsAccountDelete({ isAccountDelete: false }));

      notify({
        variant: "success",
        description: message,
      });
    } catch (error) {
      setLoading(false);
      console.error(`Cancel delete user failed: ${error}`);
      throw error;
    }
  };

  const changePassword = async (values: ChangePasswordInput): Promise<void> => {
    try {
      setLoading(true);

      const changePasswordResp = await HttpClient.post<UserDetailsResponse>(
        CHANGE_PASSWORD_API,
        values
      );

      setLoading(false);

      const { error, message } = changePasswordResp;
      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return;
      }

      dispatch(
        updateRememberMeData({
          identifier: rememberMe.identifier,
          password: values.newPassword,
        })
      );
      notify({
        variant: "success",
        description: message,
      });
    } catch (error) {
      setLoading(false);
      console.error(`Change password failed: ${error}`);
      throw error;
    }
  };

  return {
    updateProfile,
    updateDisplayPicture,
    deleteProfile,
    cancelDeleteProfile,
    changePassword,
  };
};
