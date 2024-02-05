import { ReactNode } from "react";
import SignUpForm from "../components/Auth/SignUpForm";
import LoginForm from "../components/Auth/LoginForm";
import VerifyEmailForm from "../components/Auth/VerifyEmailForm";
import ResetPasswordForm from "../components/Auth/ResetPasswordForm";
import ChangePasswordForm from "../components/Auth/ChangePasswordForm";
import ChooseUsernameForm from "../components/Auth/ChooseUsernameForm";

export const authFormData: Record<string, ReactNode> = {
    signup: <SignUpForm />,
    login: <LoginForm />,
    verifyEmail: <VerifyEmailForm />,
    resetPassword: <ResetPasswordForm/>,
    changePassword: <ChangePasswordForm/>,
    chooseUsername: <ChooseUsernameForm />,
    checkEmail: "",
};
