import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { HttpClient } from "../client";
// import { globalObject } from "../utils";
import { endpoints } from "./Api";
import { useNotification } from "../hooks";
import {
  AuthResponse,
  LoginUserInput,
  RegisterUserInput,
  ForgotPasswordInput,
  AuthService,
  RegisterResponse,
} from "../types";
import { paths } from "../data";

const {
  LOGIN_API,
  LOGOUT_API,
  REGISTER_API,
  VERIFY_EMAIL_API,
  FORGOTPASSWORD_API,
  RESETPASSWORD_API,
  RESEND_OTPCODE_API,
} = endpoints;

export const useAuthService = (): AuthService => {
  const { discover } = paths;

  const { authenticateUser, unAuthenticateUser, setSignUpData /*setLToken*/ } =
    useAuth();
  const [notify] = useNotification();
  const navigate = useNavigate();

  const login = async (data: LoginUserInput): Promise<void> => {
    try {
      const loginResp = await HttpClient.post<AuthResponse>(LOGIN_API, data);

      // if (response.error) {
      //   notify({
      //     title: "Error",
      //     variant: "error",
      //     description: response.message,
      //   });
      //   return;
      // }
      const { aToken } = loginResp.data;
      const user = JSON.parse(atob(aToken.split(".")[1]));
      localStorage.atoken = aToken;
      localStorage.user = JSON.stringify(user);
      // setLToken(loginResp.lToken);
      // globalObject.lToken = loginResp.lToken;
      authenticateUser({ id: user.id });
      navigate(`${discover}`);
    } catch (error) {
      notify({
        title: "Error",
        variant: "error",
        description: "Login failed. Incorrect email/username or password",
      });
      console.error(`Login failed: ${error}`);
      throw error;
    }
  };

  const socialAuth = async (tokenParam: string) => {
    try {
      const token = tokenParam
        .slice(tokenParam.indexOf("=") + 1)
        .replace("%20", " ");

      const user = JSON.parse(atob(token.split(".")[1]));
      localStorage.atoken = token;
      localStorage.user = JSON.stringify(user);
      authenticateUser({ id: user.id });
    } catch (error) {
      console.error(`SocialAuth login failed: ${error}`);
      throw error;
    }
  };

  const register = async (data: RegisterUserInput): Promise<void> => {
    try {
      const registerResp = await HttpClient.post<RegisterResponse>(
        REGISTER_API,
        data
      );

      if (registerResp.error) {
        notify({
          title: "Error",
          variant: "error",
          description: registerResp.message,
        });
        return;
      }

      notify({
        title: "Success",
        variant: "success",
        description: `${registerResp.message}`,
      });
      const { email, name, codeExpire } = registerResp.data;
      console.log("name :>> ", name);
      setSignUpData(registerResp.data);
      // localStorage.registerData = JSON.stringify(registerResp);
      const verifyUrl = `/verify-email/${email}/${name}/${codeExpire}`;
      navigate(verifyUrl);
    } catch (error) {
      console.error(`Signup failed: ${error}`);
      throw error;
    }
  };

  const verifyEmail = async (data: any): Promise<void> => {
    try {
      const verifyEmailResp = await HttpClient.post<AuthResponse>(
        VERIFY_EMAIL_API,
        data
      );
      if (verifyEmailResp.error) {
        notify({
          title: "Error",
          variant: "error",
          description: verifyEmailResp.message,
        });
        return;
      }

      notify({
        title: "Success",
        variant: "success",
        description: verifyEmailResp.message,
      });

      navigate("/login");
    } catch (error) {
      console.error(`Verify email failed: ${error}`);
      throw error;
    }
  };

  const resendOtpCode = async (data: any): Promise<void> => {
    try {
      const resendOtpCodeResp = await HttpClient.post<any>(
        RESEND_OTPCODE_API,
        data
      );

      if (resendOtpCodeResp.error) {
        notify({
          title: "Error",
          variant: "error",
          description: resendOtpCodeResp.message,
        });
        return;
      }

      notify({
        title: "Success",
        variant: "success",
        description: `${resendOtpCodeResp.message}`,
      });
      const { email, name, codeExpire } = resendOtpCodeResp.data;
      console.log("name :>> ", name);
      const verifyUrl = `/verify-email/${email}/${name}/${codeExpire}`;
      navigate(verifyUrl);
    } catch (error) {
      console.error(`Resend otp code failed. ${error}`);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await HttpClient.get<AuthResponse>(LOGOUT_API);
      unAuthenticateUser();
      delete localStorage.atoken;
      delete localStorage.user;
      delete localStorage.lastLocation;
      // delete localStorage.registerData;
      navigate("/");
    } catch (error) {
      notify({
        title: "Error",
        variant: "error",
        description: "Logout failed.",
      });
      console.error(`Logout failed: ${error}`);
      throw error;
    }
  };

  const forgotPassword = async (data: ForgotPasswordInput): Promise<void> => {
    try {
      const forgotPasswordResp = await HttpClient.post<AuthResponse>(
        FORGOTPASSWORD_API,
        data
      );
      // if (response.error) {
      //   notify({
      //     title: "Error",
      //     variant: "error",
      //     description: response.message,
      //   });
      //   return;
      // }

      notify({
        title: "Success",
        variant: "info",
        description: forgotPasswordResp.message,
      });
      navigate("/password-code");
    } catch (error) {
      console.error(`Forgot Pass Failed: ${error}`);
      throw error;
    }
  };

  const resetPassword = async (data: any, token: string): Promise<void> => {
    try {
      const resetPasswordResp = await HttpClient.put<AuthResponse>(
        `${RESETPASSWORD_API}/${token}`,
        data
      );
      if (resetPasswordResp.error) {
        notify({
          title: "Error",
          variant: "error",
          description: resetPasswordResp.message,
        });
        return;
      }

      notify({
        title: "Success",
        variant: "info",
        description: resetPasswordResp.message,
      });
    } catch (error) {
      console.error(`Reset Pass Failed: ${error}`);
      throw error;
    }
  };

  return {
    login,
    socialAuth,
    register,
    verifyEmail,
    logout,
    forgotPassword,
    resetPassword,
    resendOtpCode,
  };
};

// export default useAuthService;
