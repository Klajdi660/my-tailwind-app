import { useDispatch } from "react-redux";
import { profileEndpoints } from "./Api";
import {
  setAccountDeleteDaysDifference,
  setIsAccountDelete,
  setUser,
} from "../store";
import {
  ChangePasswordValues,
  DeleteProfileValues,
  EditProfileValues,
  ServerResponse,
  ServerResponseError,
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

  const dispatch = useDispatch();
  const { setLoading } = useStore();
  const [notify] = useNotification();

  const changeUsername = async (values: EditProfileValues) => {
    try {
      setLoading(true);

      const response = await HttpClient.post<ServerResponse>(
        CHANGE_USERNAME_API,
        values
      );

      setLoading(false);

      const { error, message, data } = response;

      if (error) throw response;

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
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`change_username_error: ${JSON.stringify(error)}`);
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

      const response = await HttpClient.post<ServerResponse>(
        UPDATE_PROFILE_API,
        values
      );

      setLoading(false);

      const { error, message, data } = response;

      if (error) throw response;

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
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`update_profile_error: ${JSON.stringify(error)}`);
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

      const response = await HttpClient.put<ServerResponse>(
        UPDATE_PROFILE_PICTURE_API,
        formData,
        { headers }
      );

      const { error, message, data } = response;

      if (error) throw response;

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
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`Failed to upload profile photo: ${error}`);
      notify({
        variant: ERROR,
        description: error.message,
      });
    }
  };

  const removeDisplayPicture = async () => {
    try {
      const response = await HttpClient.delete<ServerResponse>(
        DELETE_PROFILE_PICTURE_API
      );

      const { error, message, data } = response;

      if (error) throw response;

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
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`Failed to remove profile photo: ${error}`);
      notify({
        variant: ERROR,
        description: error.message,
      });
    }
  };

  const deleteProfile = async (values: DeleteProfileValues) => {
    try {
      setLoading(true);

      const response = await HttpClient.post<ServerResponse>(
        DELETE_PROFILE_API,
        values
      );

      setLoading(false);

      const { error, message, data } = response;

      if (error) throw response;

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
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`delete_profile_error: ${JSON.stringify(error)}`);
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

      const response = await HttpClient.post<ServerResponse>(
        CANCEL_DELETION_ACCOUNT_API
      );

      setLoading(false);

      const { error, message } = response;

      if (error) throw response;

      dispatch(setIsAccountDelete({ isAccountDelete: false }));

      notify({
        variant: SUCCESS,
        description: message,
      });
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`cancel_delete_profile_error: ${JSON.stringify(error)}`);
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

      const response = await HttpClient.post<ServerResponse>(
        CHANGE_PASSWORD_API,
        values
      );

      setLoading(false);

      const { error, message } = response;

      if (error) throw response;

      notify({
        variant: SUCCESS,
        description: message,
      });
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`change_password_error: ${JSON.stringify(error)}`);
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
      const response = await HttpClient.post<ServerResponse>(
        ADD_NEW_CREDIR_CARD_API,
        values
      );

      const { error, message } = response;

      if (error) throw response;

      notify({
        variant: SUCCESS,
        description: message,
      });
    } catch (err) {
      const error = err as ServerResponseError;
      console.error(`add_new_credit_card_error: ${JSON.stringify(error)}`);
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
