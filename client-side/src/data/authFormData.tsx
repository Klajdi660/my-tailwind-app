import { ReactNode } from "react";
import SignUpForm from "../components/Auth/SignUpForm";
import LoginForm from "../components/Auth/LoginForm";
import VerifyEmailForm from "../components/Auth/VerifyEmailForm";
import ResetPasswordForm from "../components/Auth/ResetPasswordForm";

export const authFormData: Record<string, ReactNode> = {
    signup: <SignUpForm />,
    login: <LoginForm />,
    verifyEmail: <VerifyEmailForm />,
    resetPassword: <ResetPasswordForm/>,
};
