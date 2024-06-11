import {
  createContext,
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthContextType, ProviderProps, User } from "../types";

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
  const [user, setUser] = useState<User | any>(JSON.parse(localStorage.user));
  // const [user, setUser] = useState<User | null>(null);
  const [lToken, setLToken] = useState("");
  const [signupData, setSignUpData] = useState();

  const isAuthenticated = useMemo<boolean>(() => Boolean(user), [user]);

  useEffect(() => {
    if (localStorage.atoken) setUser({ id: JSON.parse(localStorage.user).id });
  }, []);

  const authenticateUser = (user: User) => {
    setUser(user);
  };

  const unAuthenticateUser = () => {
    setUser({});
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
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
