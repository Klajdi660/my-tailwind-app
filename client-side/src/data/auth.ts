import { APP_URL } from "../configs";
import { endpoints } from "../services";
import {
  FormItemList,
  FormDataType,
  SocialAuthList,
  ThresholdsLastLognBadgeColor,
  LoginInputMetadata,
  RegisterInputMetadata,
} from "../types";

const { OAUTH_GOOGLE_API } = endpoints;

export const socialAuthList: SocialAuthList[] = [
  {
    id: 1,
    name: "Google",
    icon: "FcGoogle",
    link: `${APP_URL}${OAUTH_GOOGLE_API}`,
  },
];

export const loginFormData: FormDataType<LoginInputMetadata> = {
  metadata: {
    formName: "login",
    formTitle: "Log in",
    description: "to continue to Groove",
    footerTitle: "Don't have an account?",
    footerLink: "Sign up",
    buttonName: "Logi in",
  },
  inputMetadata: [
    {
      name: "identifier",
      placeholder: "Email, username or phone number",
      type: "text",
      icon: "AiOutlineUser",
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
      iconVisible: "AiOutlineEye",
      iconHidden: "AiOutlineEyeInvisible",
    },
  ],
};

export const registerFormData: FormDataType<RegisterInputMetadata> = {
  metadata: {
    formName: "register",
    formTitle: "Create your account",
    description: "to continue to Groove",
    footerLink: "Log in",
    footerTitle: "Have an account?",
    buttonName: "Sign up",
  },
  inputMetadata: [
    {
      name: "identifier",
      placeholder: "Email, username or phone number",
      type: "text",
      icon: "AiOutlineUser",
    },
    {
      name: "username",
      placeholder: "Username",
      type: "text",
      icon: "AiOutlineUser",
    },
    {
      name: "fullname",
      placeholder: "Full Name",
      type: "text",
      icon: "AiOutlineUser",
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
      iconVisible: "AiOutlineEye",
      iconHidden: "AiOutlineEyeInvisible",
    },
  ],
};

export const formList: FormItemList = {
  login: [
    {
      btnTxt: "Log in",
      formType: "auth",
      formName: "login",
      formTitle: "Log in",
      linkTo: "/register",
      footerLink: "Sign up",
      description: "to continue to Groove",
      footerTitle: "Don't have an account?",
    },
    {
      type: "input",
      props: {
        type: "text",
        placeholder: "Email, phone number or username",
      },
      name: "identifier",
      iconName: "AiOutlineUser",
    },
    {
      type: "input",
      name: "password",
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
      btnTxt: "Sign up",
      formName: "register",
      footerLink: "Log in",
      formTitle: "Create your account",
      description: "to continue to Groove",
      footerTitle: "Have an account?",
    },
    {
      type: "input",
      name: "email",
      iconName: "AiOutlineMail",
      props: {
        type: "email",
        placeholder: "Email Address",
      },
    },
    {
      type: "input",
      name: "mobile",
      iconName: "AiOutlinePhone",
      props: {
        type: "text",
        placeholder: "Phone number",
      },
    },
    {
      type: "input",
      name: "password",
      props: {
        type: "password",
        placeholder: "Password",
      },
    },
    {
      type: "input",
      name: "fullName",
      iconName: "AiOutlineUser",
      props: {
        type: "text",
        placeholder: "Full Name",
      },
    },
    {
      type: "input",
      name: "username",
      iconName: "AiOutlineUser",
      props: {
        type: "text",
        placeholder: "Username",
      },
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
