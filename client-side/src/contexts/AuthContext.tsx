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

  useEffect(() => {
    if (localStorage.rToken) {
      const extraParse = JSON.parse(JSON.parse(localStorage.user).extra);
      const userParse = JSON.parse(localStorage.user);
      const firstNameInitial = extraParse.firstName.charAt(0) || "";
      const lastNameInitial = extraParse.lastName.charAt(0) || "";
    
      const userImage = userParse.image
        ? userParse.image
        : `https://place-hold.it/52x52/2c2f32/ffffff&text=${firstNameInitial}${lastNameInitial}&fontsize=25`;
        
      setUser({ ...userParse, image: userImage, extra: extraParse });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.rToken]);

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
