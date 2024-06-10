// import { useDispatch } from "react-redux";
import { userEndpoints } from "./Api";
import { HttpClient } from "../client";
import { useAuth, useNotification } from "../hooks";

const { GET_USER_DETAILS_API } = userEndpoints;

interface UserDetailsResponse {
  error: boolean;
  messsage: string;
  data: any;
}

export const useUserService = () => {
  const { user } = useAuth();
  // const { setLoading, selectedTimeZone } = useStore();
  const [notify] = useNotification();
  // const dispatch = useDispatch();

  const getUsers = async () => {};

  const getUserDetails = async () => {
    try {
      const url = `${GET_USER_DETAILS_API}/${user?.id}`;
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
    } catch (error) {
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
