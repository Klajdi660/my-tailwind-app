import { useDispatch, useSelector } from "react-redux";
import { profileEndpoints } from "./Api";
import { HttpClient } from "../client";
import { useAuth, useNotification, useStore } from "../hooks";
import {
  setIsAccountDelete,
  updateRememberMeData,
  setAccountDeleteDaysDifference,
} from "../store";
import {
  EditProfileInput,
  DeleteProfileInput,
  ChangePasswordInput,
  UserDetailsResponse,
  PersonalDetailsInput,
} from "../types";

const {
  UPDATE_PROFILE_API,
  DELETE_PROFILE_API,
  CHANGE_PASSWORD_API,
  CHANGE_USERNAME_API,
  UPDATE_PROFILE_PICTURE_API,
  DELETE_PROFILE_PICTURE_API,
  CANCEL_DELETION_ACCOUNT_API,
} = profileEndpoints;

export const useProfileService = () => {
  const { user, setUser } = useAuth();
  const { setLoading } = useStore();
  const [notify] = useNotification();
  const dispatch = useDispatch();

  const rememberMe = useSelector((state: any) => state.rememberMe);

  const changeUsername = async (values: EditProfileInput): Promise<void> => {
    try {
      setLoading(true);

      const profileDetailsResp = await HttpClient.post<UserDetailsResponse>(
        CHANGE_USERNAME_API,
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

      localStorage.user = JSON.stringify(data);
      setUser(data);

      if (
        (values.username && rememberMe.rememberType === "username",
        user?.provider === "Email")
      ) {
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

  const updateProfile = async (values: any): Promise<void> => {
    try {
      setLoading(true);

      const profileDetailsResp = await HttpClient.post<UserDetailsResponse>(
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

      const extra = JSON.parse(data.extra);

      data.extra = {
        ...extra,
      };

      localStorage.user = JSON.stringify(data);
      setUser(data);

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

  const updateDisplayPicture = async (values: any) => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
      };

      const profilePhotoResp = await HttpClient.put<UserDetailsResponse>(
        UPDATE_PROFILE_PICTURE_API,
        values,
        { headers }
      );

      const { error, message, data } = profilePhotoResp;
      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return;
      }

      const extra = JSON.parse(data.extra);

      data.extra = {
        ...extra,
      };

      localStorage.user = JSON.stringify(data);
      setUser(data);

      notify({
        variant: "success",
        description: message,
      });
    } catch (error) {
      console.error(`Failed to upload profile photo: ${error}`);
    }
  };

  const removeDisplayPicture = async () => {
    try {
      const removeProfilePhotoResp =
        await HttpClient.delete<UserDetailsResponse>(
          DELETE_PROFILE_PICTURE_API
        );

      const { error, message, data } = removeProfilePhotoResp;
      if (error) {
        notify({
          variant: "error",
          description: message,
        });
        return;
      }

      const extra = JSON.parse(data.extra);

      data.extra = {
        ...extra,
      };

      localStorage.user = JSON.stringify(data);
      setUser(data);

      notify({
        variant: "success",
        description: message,
      });
    } catch (error) {
      console.error(`Failed to remove profile photo: ${error}`);
    }
  };

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
    changeUsername,
    updateProfile,
    updateDisplayPicture,
    removeDisplayPicture,
    deleteProfile,
    cancelDeleteProfile,
    changePassword,
  };
};
