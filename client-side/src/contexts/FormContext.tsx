import { useLocation } from "react-router-dom";
import { createContext, FunctionComponent, useMemo } from "react";
import { formList } from "../data";
import { FormContextType, ProviderProps } from "../types";

const initialState: FormContextType = {
  listForm: [],
};

const FormContext = createContext(initialState);

const FormProvider: FunctionComponent<ProviderProps> = ({ children }) => {
  const { pathname } = useLocation();

  const key = pathname.split("/")[1];

  const listForm = useMemo(() => {
    return formList[key];
  }, [key]);

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
