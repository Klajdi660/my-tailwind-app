import { createContext, FunctionComponent, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { formList } from "../data";
import { FormListContextType, ProviderProps } from "../types";

const initialState: FormListContextType = {
  lists: [],
};

const FormListContext = createContext(initialState);

const FormListProvider: FunctionComponent<ProviderProps> = ({ children }) => {
  let { pathname } = useLocation();
  pathname = pathname.replace(/\//, "");

  const lists = useMemo(() => {
    return formList[pathname];
  }, [pathname]);

  return (
    <FormListContext.Provider
      value={{
        ...initialState,
        lists,
      }}
    >
      {children}
    </FormListContext.Provider>
  );
};

export { FormListContext, FormListProvider };
