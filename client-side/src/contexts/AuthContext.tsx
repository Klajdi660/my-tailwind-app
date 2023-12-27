import { 
  createContext,
  FunctionComponent,
  useEffect,
  useMemo,
  useState, 
} from "react";
import { User } from "../types/user.type";
import { AuthContextType, AuthProviderProps } from "../types/context.type";

const initialState: AuthContextType = {
  isAuthenticated: false,
  lToken: "",
  setLToken: (lToken) => {},
  authenticateUser: () => {},
  unAuthenticateUser: () => {},
  updateUser: () => {},
};
  
const AuthContext = createContext(initialState);

const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [lToken, setLToken] = useState("");
  const isAuthenticated = useMemo<boolean>(() => Boolean(user), [user]);
  console.log('localStorage :>> ', localStorage.user);
  useEffect(() => {
    if (localStorage.rToken) setUser(JSON.parse(localStorage.user));
    // if (localStorage.rToken) setUser({ id: JSON.parse(localStorage.user).id })

  }, []);

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
        setLToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
