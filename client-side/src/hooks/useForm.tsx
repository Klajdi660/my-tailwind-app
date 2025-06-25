import { useContext } from "react";
import { FormContext } from "../contexts";

export const useForms = () => {
  const context = useContext(FormContext);
  if (!context)
    throw new Error("useFormList must be used iniside FormListProvider");
  return context;
};
