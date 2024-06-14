import { profileEndpoints } from "./Api";
import { HttpClient } from "../client";
import { useAuth, useNotification } from "../hooks";

const { UPDATE_PROFILE, UPDATE_PROFILE_PICTURE, DELETE_PROFILE } =
  profileEndpoints;

interface UserDetailsResponse {
  error: boolean;
  messsage: string;
  data: any;
}

export const useProfileService = () => {
  const { user, setUser } = useAuth();

  const [notify] = useNotification();

  const updateProfile = async () => {
    try {
      const userId = user?.id || JSON.parse(localStorage.user)?.id;
      if (!userId) throw new Error("User ID is not available");

      const url = `${UPDATE_PROFILE}/${userId}`;

      const userDetailsResp = await HttpClient.get<UserDetailsResponse>(url);

      const { error, messsage, data } = userDetailsResp;

      if (error) {
        notify({
          variant: "error",
          description: messsage,
        });
      }

      data.extra = {
        ...JSON.parse(data.extra),
      };

      setUser(data);
    } catch (error) {
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
