import { APP_URL } from "../configs";
import { endpoints } from "../services";
import {
  FormItemList,
  FormTitleList,
  SocialAuthList,
  ThresholdsLastLognBadgeColor,
} from "../types";

const { OAUTH_GOOGLE_API } = endpoints;

export const titles: FormTitleList = {
  login: "Sign In",
  register: "Create your account",
  "/verify-email": "Verify Email",
  "/reset-password": "Reset Password",
  "/verify-reset-password": "Complete Reset Password",
};

export const socialAuthList: SocialAuthList[] = [
  {
    id: 1,
    name: "Google",
    icon: "FcGoogle",
    link: `${APP_URL}${OAUTH_GOOGLE_API}`,
  },
];

export const formList: FormItemList = {
  login: [
    {
      btnTxt: "Login",
      formType: "auth",
      formName: "login",
      formTitle: "Login",
      linkTo: "/register",
      footerLink: "Sign up",
      description: "to continue to Groove",
      footerTitle: "Don't have an Account?",
    },
    {
      type: "input",
      props: {
        type: "text",
        placeholder: "Email address or Username",
      },
      name: "identifier",
      iconName: "AiOutlineUser",
      label: "",
    },
    {
      type: "input",
      name: "password",
      label: "",
      props: {
        placeholder: "Password",
        type: "password",
      },
    },
    {
      type: "checkbox",
      name: "remember",
      props: {
        placeholder: "",
        type: "checkbox",
      },
      label: "Remember Me",
    },
  ],
  register: [
    {
      formType: "auth",
      linkTo: "/login",
      btnTxt: "Register",
      formName: "register",
      footerLink: "Sign in",
      formTitle: "Create your account",
      description: "to continue to Groove",
      footerTitle: "Already have an account?",
    },
    {
      type: "input",
      name: "email",
      iconName: "AiOutlineMail",
      props: {
        type: "email",
        placeholder: "Email Address",
      },
      label: "",
    },
    {
      type: "input",
      name: "password",
      props: {
        type: "password",
        placeholder: "Password",
      },
      label: "",
    },
    {
      type: "input",
      name: "fullName",
      iconName: "AiOutlineUser",
      props: {
        type: "text",
        placeholder: "Full Name",
      },
      label: "",
    },
    {
      type: "input",
      name: "username",
      iconName: "AiOutlineUser",
      props: {
        type: "text",
        placeholder: "Username",
      },
      label: "",
    },
  ],
  "verify-email": [
    {
      formType: "auth",
      linkTo: "/login",
      footerLink: "Go back",
      btnTxt: "Verify Email",
      formName: "verify-email",
      formTitle: "Verify your account",
      footerTitle: "Remember Password?",
      description: "to continue to Groove",
    },
  ],
  "forgot-password": [
    {
      formType: "auth",
      linkTo: "/login",
      footerLink: "Go back",
      btnTxt: "Reset Password",
      formName: "forgot-password",
      formTitle: "Reset Password",
      footerTitle: "Remember Password?",
      description:
        "Enter your email address, and we'll send a link to reset password to continue to Groove",
    },
    {
      type: "input",
      name: "email",
      iconName: "AiOutlineMail",
      props: {
        type: "email",
        placeholder: "Email Address",
      },
      label: "",
    },
  ],
  "reset-password": [
    {
      linkTo: "/login",
      formType: "auth",
      footerLink: "Go back",
      btnTxt: "Reset Password",
      formName: "reset-password",
      formTitle: "Choose New Password",
      footerTitle: "Remember Password?",
      description: "to continue to Groove",
    },
    {
      type: "input",
      name: "password",
      props: {
        placeholder: "New Password",
        type: "password",
      },
      label: "",
    },
    {
      type: "input",
      name: "confirmPassword",
      props: {
        type: "confirmPassword",
        placeholder: "Confirm New Password",
      },
      label: "",
    },
  ],
  "password-code": [
    {
      linkTo: "/login",
      formType: "auth",
      footerLink: "Go back",
      btnTxt: "Reset Password",
      formName: "password-code",
      footerTitle: "Remember Password?",
      formTitle: "Continue Reset Password",
      description: "Enter code to continue to Groove",
    },
  ],
  profile: [
    {
      btnTxt: "Save",
      formName: "profile",
      formTitle: "Profile",
    },
    {
      type: "input",
      name: "username",
      label: "",
      props: {
        type: "text",
        placeholder: "Username",
      },
    },
    {
      type: "input",
      name: "email",
      label: "",
      props: {
        disabled: true,
        type: "text",
        placeholder: "Email",
      },
    },
  ],
};

export const thresholdsLastLognBadgeColor: ThresholdsLastLognBadgeColor[] = [
  { limit: 30, color: "green" }, // Less than 30 minutes
  { limit: 60, color: "yellow" }, // More than 30 minutes but less than 1 hour
  { limit: 24 * 60, color: "orange" }, // More than 1 hour but less than 24 hours
  { limit: 24 * 60 * 7, color: "red" }, // More than a day but less than a week
  { limit: 24 * 60 * 30, color: "purple" }, // More than a week but less than a month
  { limit: Infinity, color: "gray" }, // More than a month
];
