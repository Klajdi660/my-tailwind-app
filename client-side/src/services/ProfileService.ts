import { useDispatch, useSelector } from "react-redux";
import { profileEndpoints } from "./Api";
import { HttpClient } from "../client";
import { useAuth, useNotification, useStore } from "../hooks";
import { updateRememberMeData } from "../store";
import {
  ChangePasswordProps,
  EditProfileInput,
  UserDetailsResponse,
} from "../types";

const { UPDATE_PROFILE, UPDATE_PROFILE_PICTURE, DELETE_PROFILE } =
  profileEndpoints;

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
        UPDATE_PROFILE,
        values
      );

      setLoading(false);

      const { error, message, data } = profileDetailsResp;
      if (error) {
        notify({
          variant: "error",
          description: message,
        });
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

  const deleteProfile = async () => {};

  const changePassword = async (
    values: ChangePasswordProps
  ): Promise<void> => {};

  return {
    updateProfile,
    updateDisplayPicture,
    deleteProfile,
    changePassword,
  };
};
