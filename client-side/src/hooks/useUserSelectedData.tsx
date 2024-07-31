import { useDispatch } from "react-redux";
import { setUserData } from "../store";

export const useUserSelectedData = () => {
  const dispatch = useDispatch();

  const setUserSelectedData = (userSelectedData: any) => {
    dispatch(setUserData(userSelectedData));
  };

  return { setUserSelectedData };
};
