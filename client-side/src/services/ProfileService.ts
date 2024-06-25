import { profileEndpoints } from "./Api";
import { HttpClient } from "../client";
import { useAuth, useNotification, useStore } from "../hooks";
import { EditProfileInput, UserDetailsResponse } from "../types";

const { UPDATE_PROFILE, UPDATE_PROFILE_PICTURE, DELETE_PROFILE } =
  profileEndpoints;

export const useProfileService = () => {
  const { setUser } = useAuth();
  const { setLoading } = useStore();
  const [notify] = useNotification();

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

  const changePassword = async () => {};

  return {
    updateProfile,
    updateDisplayPicture,
    deleteProfile,
    changePassword,
  };
};
