import { useMemo, useState, useEffect, createContext, FC } from "react";
import { AuthContextType, ProviderProps, User } from "../types";

const initialState: AuthContextType = {
  lToken: "",
  isAuthenticated: false,
  updateUser: () => {},
  setSignUpData: () => {},
  setLToken: (lToken) => {},
  authenticateUser: () => {},
  unAuthenticateUser: () => {},
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

const AuthProvider: FC<ProviderProps> = ({ children }) => {
  const [lToken, setLToken] = useState("");
  const [signupData, setSignUpData] = useState();
  // const [user, setUser] = useState<User | null>(null);
  const [user, setUser] = useState<User | null>(getUserFromLocalStorage());

  const isAuthenticated = useMemo<boolean>(() => Boolean(user), [user]);

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      setUser(storedUser);
    }
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
