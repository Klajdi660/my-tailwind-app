import {
  createContext,
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useUserService } from "../services";
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

const getUserFromLocalStorage = (): User | null => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const atoken = localStorage.getItem("atoken");
    if (user && atoken) {
      return user;
    }
  } catch (error) {
    console.error("Error parsing user from localStorage", error);
  }
  return null;
};

const AuthContext = createContext(initialState);

const AuthProvider: FunctionComponent<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getUserFromLocalStorage());
  const [lToken, setLToken] = useState("");
  const [signupData, setSignUpData] = useState();
  const isAuthenticated = useMemo<boolean>(() => Boolean(user), [user]);
  // const { getUserDetails } = useUserService();

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     if (localStorage.atoken) {
  //       const data = await getUserDetails();
  //       if (data) {
  //         setUser(data);
  //       }
  //     }
  //   };

  //   fetchUserDetails();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [localStorage.atoken]);

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
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
