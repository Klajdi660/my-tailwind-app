import { useDispatch } from "react-redux";
import { profileEndpoints } from "./Api";
import {
  setIsAccountDelete,
  setAccountDeleteDaysDifference,
  setUser,
} from "../store";
import {
  EditProfileValues,
  DeleteProfileValues,
  ChangePasswordValues,
  UserDetailsResponse,
  // PersonalDetailsInput,
} from "../types";
import { HttpClient } from "../client";
import { useNotification, useStore } from "../hooks";

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
  const { setLoading } = useStore();
  const [notify] = useNotification();
  const dispatch = useDispatch();

  const changeUsername = async (values: EditProfileValues): Promise<void> => {
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
      dispatch(setUser(data));

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
      dispatch(setUser(data));

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

  const updateDisplayPicture = async (formData: any, photoType: string) => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
      };

      const params = new URLSearchParams({ photoType }).toString();
      const url = `${UPDATE_PROFILE_PICTURE_API}?${params}`;

      const profilePhotoResp = await HttpClient.put<UserDetailsResponse>(
        url,
        formData,
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
      dispatch(setUser(data));

      notify({
        variant: "success",
        description: message,
      });
    } catch (error) {
      console.error(`Failed to upload profile photo: ${error}`);
    }
  };

  const removeDisplayPicture = async (photoType: string) => {
    try {
      const params = new URLSearchParams({ photoType }).toString();
      const url = `${DELETE_PROFILE_PICTURE_API}?${params}`;

      const removeProfilePhotoResp =
        await HttpClient.delete<UserDetailsResponse>(url);

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
      dispatch(setUser(data));

      notify({
        variant: "success",
        description: message,
      });
    } catch (error) {
      console.error(`Failed to remove profile photo: ${error}`);
    }
  };

  const deleteProfile = async (values: DeleteProfileValues) => {
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

      const { error, message } = cancelDeleteProfileResp;
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

  const changePassword = async (
    values: ChangePasswordValues
  ): Promise<void> => {
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
