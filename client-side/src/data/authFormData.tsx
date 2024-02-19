import { ReactNode } from "react";
import { ForgotPasswordForm, LoginForm, SignUpForm, VerifyEmailForm, ResetPasswordForm } from "../components/Auth";

export const authFormData: Record<string, ReactNode> = {
    "register": <SignUpForm />,
    "login": <LoginForm />,
    "verify-email": <VerifyEmailForm />,
    "forgot-password": <ForgotPasswordForm/>,
    "reset-password": <ResetPasswordForm/>,
};
