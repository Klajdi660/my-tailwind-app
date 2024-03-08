import { ReactNode } from "react";
import { SignUpForm, LoginForm, OTPCodeForm, ForgotPasswordForm, ResetPasswordForm } from "../components/Auth";

interface AuthForms {
    [key: string]: ReactNode | ((btnText: string) => ReactNode);
}

export const authFormData: AuthForms = {
    "register": <SignUpForm />,
    "login": <LoginForm />,
    "verify-email": (btnText: string) => <OTPCodeForm btnText={btnText} />,
    "forgot-password": <ForgotPasswordForm />,
    "password-code": (btnText: string) => <OTPCodeForm btnText={btnText} />,
    "reset-password": <ResetPasswordForm />,
};

