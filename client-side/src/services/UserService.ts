import { HttpClient } from "../client";
import { useStore } from "../hooks";

const useUserService = () => {
  const { setLoading, selectedTimeZone } = useStore();

  const getUsers = async () => {};

  const getUserDetails = async () => {};

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

export default useUserService;
