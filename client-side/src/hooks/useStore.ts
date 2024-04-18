import { useContext } from "react";
import { StoreContext } from "../contexts";

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
};
