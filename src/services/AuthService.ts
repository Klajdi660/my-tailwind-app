import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { HttpClient } from "../client";
// import { globalObject } from "../utils";
import { AuthResponse } from "../types/user.type";
import { endpoints } from "./Api";

const { LOGIN_API } = endpoints;
console.log('endpoints :>> ', endpoints);
interface AuthService {
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthService = (): AuthService => {
  const { authenticateUser, unAuthenticateUser, setLToken } = useAuth();
  const navigate = useNavigate();

  const login = async (username: string, password: string): Promise<void> => {
    // let data = { username, password, shard: "bm", part: 0, };
    let data = { usernameOrEmail: username, password };
    let url=`http://localhost:8080/api/auth/sessions`;

    try {
      const response = await HttpClient.post<AuthResponse>(url, data);
      // const user = JSON.parse(atob(response.rToken.split(".")[1]));
      console.log('response :>> ', response);
      const user = response.rToken;
      console.log('user :>> ', user);
      // if (![10, 11, 12].includes(user.role)) throw new Error();
      localStorage.rToken = response.rToken;
      localStorage.user = JSON.stringify(user);
      // setLToken(response.lToken)
      // globalObject.lToken = response.lToken
      // authenticateUser({ id: user.id });
      // navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    let url = `/auth/logout`
    try {
      await HttpClient.post<AuthResponse>(url);
      unAuthenticateUser();
      delete localStorage.rToken;
      delete localStorage.user;
    } catch (error) {
      console.error("Logout failed:", error);
      // throw error;
    }
  };

  return { login, logout };
};
