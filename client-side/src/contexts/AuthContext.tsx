import {
  createContext,
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthContextType, ProviderProps, User } from "../types";
import { Loading } from "../components";

const initialState: AuthContextType = {
  isAuthenticated: false,
  lToken: "",
  setLToken: (lToken) => {},
  authenticateUser: () => {},
  unAuthenticateUser: () => {},
  updateUser: () => {},
  setSignUpData: () => {},
};

const AuthContext = createContext(initialState);

const AuthProvider: FunctionComponent<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [lToken, setLToken] = useState("");
  const [signupData, setSignUpData] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = useMemo<boolean>(() => Boolean(user), [user]);
  console.log("user auth:>> ", user);
  // useEffect(() => {
  //   const fetchDataFromLocalStorage = () => {
  //     if (localStorage.atoken) {
  //       // const extraParse = JSON.parse(JSON.parse(localStorage.user).extra);
  //       // const userParse = JSON.parse(localStorage.user);
  //       // const firstNameInitial = extraParse?.firstName?.charAt(0) || "";
  //       // const lastNameInitial = extraParse?.lastName?.charAt(0) || "";
  //       // const name = `${firstNameInitial}${lastNameInitial}`;
  //       // const userAvatar = extraParse.photos;
  //       // ? extraParse.photos
  //       // : `https://place-hold.it/52x52/F3F4F6/4B5563&text=${firstNameInitial}${lastNameInitial}&fontsize=20`;
  //       // setUser({ ...userParse, avatar: userAvatar, extra: extraParse, name });
  //     }
  //     setIsLoading(false);
  //   };

  //   fetchDataFromLocalStorage();
  //   // if (localStorage.atoken) setUser({ id: JSON.parse(localStorage.user).id });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [localStorage.atoken]);

  useEffect(() => {
    if (localStorage.atoken) {
      setUser({
        id: JSON.parse(localStorage.user).id,
      });
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.atoken]);

  const authenticateUser = (user: User) => {
    setUser(user);
  };

  const unAuthenticateUser = () => {
    setUser(null);
  };

  const updateUser = () => {};

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...initialState,
        user,
        isAuthenticated,
        authenticateUser,
        unAuthenticateUser,
        lToken,
        setLToken,
        signupData,
        setSignUpData,
      }}
    >
      {isLoading ? <Loading /> : children}
      {/* {children} */}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
