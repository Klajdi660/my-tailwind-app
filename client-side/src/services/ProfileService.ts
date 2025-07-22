import { useDispatch } from "react-redux";
import { profileEndpoints } from "./Api";
import {
  setUser,
  // setSavedAuthUser,
  setIsAccountDelete,
  setAccountDeleteDaysDifference,
} from "../store";
import {
  EditProfileValues,
  DeleteProfileValues,
  UserDetailsResponse,
  ChangePasswordValues,
} from "../types";
import { HttpClient } from "../client";
import { useNotification, useStore } from "../hooks";
import { notifyVariant } from "../data";

export const useProfileService = () => {
  const {
    UPDATE_PROFILE_API,
    DELETE_PROFILE_API,
    CHANGE_PASSWORD_API,
    CHANGE_USERNAME_API,
    UPDATE_PROFILE_PICTURE_API,
    DELETE_PROFILE_PICTURE_API,
    CANCEL_DELETION_ACCOUNT_API,
    ADD_NEW_CREDIR_CARD_API,
  } = profileEndpoints;
  const { ERROR, SUCCESS } = notifyVariant;

  const { setLoading } = useStore();
  const [notify] = useNotification();
  const dispatch = useDispatch();

  const changeUsername = async (values: EditProfileValues) => {
    try {
      setLoading(true);

      const profileDetailsResp = await HttpClient.post<UserDetailsResponse>(
        CHANGE_USERNAME_API,
        values
      );

      setLoading(false);

      const { error, message, data } = profileDetailsResp;

      if (error) throw profileDetailsResp;

      data.extra = {
        ...JSON.parse(data.extra),
      };

      localStorage.setItem("user", JSON.stringify(data));
      dispatch(setUser(data));

      notify({
        variant: SUCCESS,
        description: message,
      });
      return { error: false, message };
    } catch (error: any) {
      setLoading(false);
      notify({
        variant: ERROR,
        description: error.message,
      });

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

      if (error) throw profileDetailsResp;

      const extra = JSON.parse(data.extra);

      data.extra = {
        ...extra,
      };

      localStorage.setItem("user", JSON.stringify(data));
      dispatch(setUser(data));

      notify({
        variant: SUCCESS,
        description: message,
      });
    } catch (error: any) {
      setLoading(false);
      notify({
        variant: ERROR,
        description: error.message,
      });

      throw error;
    }
  };

  const updateDisplayPicture = async (formData: any) => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
      };

      const profilePhotoResp = await HttpClient.put<UserDetailsResponse>(
        UPDATE_PROFILE_PICTURE_API,
        formData,
        { headers }
      );

      const { error, message, data } = profilePhotoResp;
      if (error) {
        notify({
          variant: ERROR,
          description: message,
        });
        return;
      }

      const extra = JSON.parse(data.extra);
      data.extra = {
        ...extra,
      };

      localStorage.setItem("user", JSON.stringify(data));
      dispatch(setUser(data));
      // dispatch(
      //   setSavedAuthUser({
      //     id: data.id,
      //     photo: data.extra.avatar,
      //   })
      // );

      notify({
        variant: SUCCESS,
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
          variant: ERROR,
          description: message,
        });
        return;
      }

      const extra = JSON.parse(data.extra);
      data.extra = {
        ...extra,
      };

      localStorage.setItem("user", JSON.stringify(data));

      dispatch(setUser(data));
      // dispatch(
      //   setSavedAuthUser({
      //     id: data.id,
      //     photo: data.extra.avatar,
      //   })
      // );

      notify({
        variant: SUCCESS,
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

      if (error) throw deleteProfileResp;

      dispatch(setIsAccountDelete({ isAccountDelete: true }));
      dispatch(
        setAccountDeleteDaysDifference({
          accoundDeleteDaysDifference: data.daysDifference,
        })
      );

      notify({
        variant: SUCCESS,
        description: message,
      });
    } catch (error: any) {
      setLoading(false);
      notify({
        variant: ERROR,
        description: error.message,
      });

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

      if (error) throw cancelDeleteProfileResp;

      dispatch(setIsAccountDelete({ isAccountDelete: false }));

      notify({
        variant: SUCCESS,
        description: message,
      });
    } catch (error: any) {
      setLoading(false);
      notify({
        variant: ERROR,
        description: error.message,
      });

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

      if (error) throw changePasswordResp;

      notify({
        variant: SUCCESS,
        description: message,
      });
    } catch (error: any) {
      setLoading(false);
      notify({
        variant: ERROR,
        description: error.message,
      });

      throw error;
    }
  };

  const addNewCreditCard = async (values: object): Promise<void> => {
    try {
      const newCreditCardResp = await HttpClient.post<UserDetailsResponse>(
        ADD_NEW_CREDIR_CARD_API,
        values
      );

      const { error, message } = newCreditCardResp;

      if (error) throw newCreditCardResp;

      notify({
        variant: SUCCESS,
        description: message,
      });
    } catch (error: any) {
      notify({
        variant: ERROR,
        description: error.message,
      });

      throw error;
    }
  };

  return {
    updateProfile,
    deleteProfile,
    changePassword,
    changeUsername,
    cancelDeleteProfile,
    updateDisplayPicture,
    removeDisplayPicture,
    addNewCreditCard,
  };
};
