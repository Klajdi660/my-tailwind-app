import {
  createContext,
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthContextType, ProviderProps, User } from "../types";
// import { Loading } from "../components";

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
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = useMemo<boolean>(() => Boolean(user), [user]);

  useEffect(() => {
    if (localStorage.atoken) {
      setUser({
        id: JSON.parse(localStorage.user).id,
      });
    }

    // setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // localStorage.atoken

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
        setUser,
        isAuthenticated,
        authenticateUser,
        unAuthenticateUser,
        lToken,
        setLToken,
        signupData,
        setSignUpData,
      }}
    >
      {/* {isLoading ? <Loading /> : children} */}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
