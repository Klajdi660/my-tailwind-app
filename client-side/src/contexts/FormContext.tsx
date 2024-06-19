import { createContext, FunctionComponent, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { formList } from "../data";
import { FormContextType, ProviderProps } from "../types";

const initialState: FormContextType = {
  listForm: [],
};

const FormContext = createContext(initialState);

const FormProvider: FunctionComponent<ProviderProps> = ({ children }) => {
  const { pathname } = useLocation();

  const key = pathname.split("/")[1];
  console.log("key :>> ", key);
  const listForm = useMemo(() => {
    return formList[key];
  }, [key]);
  console.log("listForm :>> ", listForm);
  return (
    <FormContext.Provider
      value={{
        ...initialState,
        listForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
