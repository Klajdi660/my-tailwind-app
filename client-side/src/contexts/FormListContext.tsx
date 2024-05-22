import { createContext, FunctionComponent, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { formList } from "../data";
import { FormListItem, ProviderProps } from "../types";

const initialState = {
  lists: [] as FormListItem[],
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
