import { useStore } from "../hooks";

export const useUserService = () => {
  const { setLoading, selectedTimeZone } = useStore();

  const getUsers = async () => {};

  const getUserDetails = async () => {
    const user = localStorage.user;
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
