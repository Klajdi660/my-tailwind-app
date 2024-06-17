import { userEndpoints } from "./Api";
import { HttpClient } from "../client";
import { useAuth, useNotification, useStore } from "../hooks";

const { GET_USER_DETAILS_API } = userEndpoints;

interface UserDetailsResponse {
  error: boolean;
  messsage: string;
  data: any;
}

export const useUserService = () => {
  const { user, setUser } = useAuth();
  const { setLoading } = useStore();
  const [notify] = useNotification();

  const getUsers = async () => {};

  const getUserDetails = async () => {
    try {
      const userId = user?.id || JSON.parse(localStorage.user)?.id;
      if (!userId) throw new Error("User ID is not available");

      const url = `${GET_USER_DETAILS_API}/${userId}`;

      setLoading(true);

      const userDetailsResp = await HttpClient.get<UserDetailsResponse>(url);

      setLoading(false);

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
      // return data;
      setUser(data);
    } catch (error) {
      setLoading(false);
      console.error(`Get user details failed: ${error} `);
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
  };
};
