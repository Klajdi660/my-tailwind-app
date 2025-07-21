import {
  FormItemList,
  FormDataType,
  SocialAuthList,
  ThresholdsLastLognBadgeColor,
  LoginInputMetadata,
  RegisterInputMetadata,
  EmailOrPhoneButtonType,
  LoginHelpDataType,
  VerifyCodeInputMetadata,
  ErrorAuthResponseMap,
  AuthFormDataTypes,
} from "../types";
import { paths } from "./general";
import { APP_URL } from "../configs";
import { endpoints } from "../services";

const { REGISTER, LOGIN, LOGIN_HELP, RESET_PASSWORD } = paths;
const { OAUTH_GOOGLE_API } = endpoints;

export const errorAuthResponseMap: Record<string, ErrorAuthResponseMap> = {
  "no-account": { linkText: "create a new account", to: REGISTER },
  "invalid-password": { linkText: "reset your password", to: RESET_PASSWORD },
  "existing-user": { linkText: "sign in", to: LOGIN },
  "user-not-verified": {
    linkText: "verify your account",
    to: LOGIN_HELP,
    state: { nameForm: "prevVerifyAcount" },
  },
};

export const userRegex: Record<string, RegExp> = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phoneNumberRegex: /^\+?\d{7,15}$/,
  isPhoneNumberRegex: /^\d+$/,
  usernameRegex: /^[a-zA-Z0-9_]{3,30}$/,
};

export const socialAuthList: SocialAuthList[] = [
  {
    id: 1,
    name: "Google",
    icon: "FcGoogle",
    link: `${APP_URL}${OAUTH_GOOGLE_API}`,
  },
];

export const emailOrPhoneButtonList: EmailOrPhoneButtonType[] = [
  { id: 1, label: "email", name: "Email" },
  { id: 2, label: "sms", name: "SMS" },
];

export const loginFormData: FormDataType<LoginInputMetadata> = {
  metadata: {
    formName: "login",
    formTitle: "Log in",
    description: "to continue to Groove",
    footerTitle: "Don't have an account?",
    footerLink: "Sign up",
    buttonName: "Logi in",
    linkTo: REGISTER,
  },
  inputMetadata: [
    {
      name: "identifier",
      placeholder: "Email, username or phone number",
      type: "text",
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
    linkTo: LOGIN,
  },
  inputMetadata: [
    {
      name: "identifier",
      placeholder: "Email or phone number",
      type: "text",
    },
    {
      name: "username",
      placeholder: "Username",
      type: "text",
    },
    {
      name: "fullname",
      placeholder: "Full Name",
      type: "text",
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

export const authFormData: AuthFormDataTypes = {
  login: {
    metadata: {
      formName: "login",
      toFormName: "forgotPassword",
      formTitle: "Log in",
      description: "to continue to Groove",
      footerTitle: "Don't have an account?",
      footerLink: "Sign up",
      buttonName: "Logi in",
      linkTo: REGISTER,
      otherLink: {
        otherLinkName: "Forgot Password?",
        otherLinkPName: "Reset",
        otherLinkTo: LOGIN_HELP,
      },
    },
    inputMetadata: [
      {
        name: "identifier",
        placeholder: "Email, username or phone number",
        type: "text",
      },
      {
        name: "password",
        placeholder: "Password",
        type: "password",
        iconVisible: "AiOutlineEye",
        iconHidden: "AiOutlineEyeInvisible",
      },
    ],
  },
  register: {
    metadata: {
      formName: "register",
      formTitle: "Create your account",
      description: "to continue to Groove",
      footerLink: "Log in",
      footerTitle: "Have an account?",
      buttonName: "Sign up",
      linkTo: LOGIN,
    },
    inputMetadata: [
      {
        name: "identifier",
        placeholder: "Email or phone number",
        type: "text",
      },
      {
        name: "username",
        placeholder: "Username",
        type: "text",
      },
      {
        name: "fullname",
        placeholder: "Full Name",
        type: "text",
      },
      {
        name: "password",
        placeholder: "Password",
        type: "password",
        iconVisible: "AiOutlineEye",
        iconHidden: "AiOutlineEyeInvisible",
      },
    ],
  },
};

export const loginHelpFormData: Record<string, LoginHelpDataType> = {
  forgotPassword: {
    formName: "forgot-password",
    formTitle: "Reset Password",
    formDescription: "How would you like to reset your password?",
    description: "to continue to Groove",
    footerTitle: "Remember Password?",
    footerLink: "Go back",
    linkTo: LOGIN,
    emailText:
      "We will send you an email with instructions on how to reset your password",
    smsText: "We will text you a verification code to reset your password",
    emailPlaceholder: "Email",
    smsPlaceholder: "Phone number",
    emailButtonName: "Email Me",
    smsButtonName: "Text Me",
  },
  prevVerifyAcount: {
    formName: "prev-verify-account",
    formTitle: "Verify Account",
    formDescription: "How would you like to verify your account?",
    description: "to continue to Groove",
    footerTitle: "Cancel verify account?",
    footerLink: "Go back",
    linkTo: LOGIN,
    emailText:
      "We will send you an email with instructions on how to verify your account",
    smsText: "We will text you a verification code to verify your account",
    emailPlaceholder: "Email",
    smsPlaceholder: "Phone number",
    emailButtonName: "Email Me",
    smsButtonName: "Text Me",
  },
};

export const verifyCodeFormData: Record<
  string,
  FormDataType<VerifyCodeInputMetadata>
> = {
  "verify-account": {
    metadata: {
      formName: "verify-account",
      formTitle: "Verify your account",
      description: "to continue to Groove",
      footerTitle: "Cancel verify account?",
      footerLink: "Go back",
      buttonName: "Verify Account",
      linkTo: LOGIN,
      otherLink: {
        otherLinkName: "Didn't recieve code?",
        otherLinkPName: "Resend",
        otherLinkTo: "#",
      },
    },
    inputMetadata: [
      {
        name: "code",
        placeholder: "Enter 6 digit code",
        type: "text",
      },
    ],
  },
  "reset-password": {
    metadata: {
      formName: "reset-password",
      formTitle: "Reset your password",
      description: "to continue to Groove",
      footerTitle: "Remember Password?",
      footerLink: "Go back",
      buttonName: "Reset",
      linkTo: LOGIN,
    },
    inputMetadata: [
      {
        name: "code",
        placeholder: "Enter 6 digit code",
        type: "text",
      },
    ],
  },
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
      props: {
        type: "email",
        placeholder: "Email Address",
      },
    },
    {
      type: "input",
      name: "mobile",
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
      props: {
        type: "text",
        placeholder: "Full Name",
      },
    },
    {
      type: "input",
      name: "username",
      props: {
        type: "text",
        placeholder: "Username",
      },
    },
  ],
  "verify-account": [
    {
      formType: "auth",
      linkTo: "/login",
      footerLink: "Go back",
      btnTxt: "Verify Account",
      formName: "verify-account",
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
      props: {
        type: "email",
        placeholder: "Email Address",
      },
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
    },
    {
      type: "input",
      name: "confirmPassword",
      props: {
        type: "confirmPassword",
        placeholder: "Confirm New Password",
      },
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
      props: {
        type: "text",
        placeholder: "Username",
      },
    },
    {
      type: "input",
      name: "email",
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
