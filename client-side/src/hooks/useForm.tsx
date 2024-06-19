import { useContext } from "react";
import { FormContext } from "../contexts";

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context)
    throw new Error("useFormList must be used iniside FormListProvider");
  return context;
};
