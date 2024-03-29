import { createContext, FunctionComponent, ReactNode, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { formList } from "../constants";
import { FormListItem } from "../types/auth.type";

interface FormListProviderProps {
  children: ReactNode;
}

const initialState = {
  lists: [] as FormListItem[],
};

const FormListContext = createContext(initialState);

const FormListProvider: FunctionComponent<FormListProviderProps> = ({
  children,
}) => {
  let { pathname } = useLocation();

  pathname = pathname.replace(/\//, "");
  console.log("pathname :>> ", pathname);
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
