import {
  FormDataTypes,
  EmailOrPhoneButtonType,
  LoginHelpDataType,
  ServiceResponseMap,
  SocialAuthList,
  ThresholdsLastLognBadgeColor,
} from "../types";
import { paths } from "./general.data";
import { endpoints } from "../services";
import { APP_PREFIX, APP_URL } from "../configs";

const { OAUTH_GOOGLE_API } = endpoints;
const { REGISTER, LOGIN, LOGIN_HELP } = paths;

export const serviceResponseMap: Record<string, ServiceResponseMap> = {
  "invalid-password": {
    linkText: "reset your password",
    to: LOGIN_HELP,
    state: { toFormName: "prev-forgot-password" },
  },
  "user-not-verified": {
    linkText: "verify your account",
    to: LOGIN_HELP,
    state: { toFormName: "prev-verify-account" },
  },
  "existing-user": { linkText: "sign in", to: LOGIN },
  "code-expired": { linkText: "request a new otp code" },
  "no-account": { linkText: "create a new account", to: REGISTER },
};

export const userRegex: Record<string, RegExp> = {
  isPhoneNumberRegex: /^\d+$/,
  phoneNumberRegex: /^\+?\d{7,15}$/,
  usernameRegex: /^[a-zA-Z0-9_]{3,30}$/,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export const socialAuthList: SocialAuthList[] = [
  {
    id: 1,
    name: "Google",
    icon: "FcGoogle",
    link: `${APP_URL}${APP_PREFIX}${OAUTH_GOOGLE_API}`,
  },
];

export const emailOrPhoneButtonList: EmailOrPhoneButtonType[] = [
  { id: 1, label: "email", name: "Email" },
  { id: 2, label: "sms", name: "SMS" },
];

export const formData: FormDataTypes = {
  login: {
    metadata: {
      linkTo: REGISTER,
      formName: "login",
      formTitle: "Log in",
      buttonName: "Log in",
      footerLink: "Sign up",
      toFormName: "prev-forgot-password",
      description: "to continue to Groove",
      footerTitle: "Don't have an account?",
      otherLink: {
        otherLinkPName: "Reset",
        otherLinkTo: LOGIN_HELP,
        otherLinkName: "Forgot Password?",
      },
    },
    inputMetadata: [
      {
        type: "text",
        name: "identifier",
        placeholder: "Email, username or phone number",
      },
      {
        type: "password",
        name: "password",
        placeholder: "Password",
        iconVisible: "AiOutlineEye",
        iconHidden: "AiOutlineEyeInvisible",
      },
    ],
  },
  register: {
    metadata: {
      linkTo: LOGIN,
      formName: "register",
      footerLink: "Log in",
      buttonName: "Sign up",
      formTitle: "Create account",
      footerTitle: "Have an account?",
      description: "to continue to Groove",
    },
    inputMetadata: [
      {
        type: "text",
        name: "identifier",
        placeholder: "Email or phone number",
      },
      {
        type: "text",
        name: "username",
        placeholder: "Username",
      },
      {
        type: "text",
        name: "fullname",
        placeholder: "Full Name",
      },
      {
        type: "password",
        name: "password",
        placeholder: "Password",
        iconVisible: "AiOutlineEye",
        iconHidden: "AiOutlineEyeInvisible",
      },
    ],
  },
  "verify-account": {
    metadata: {
      linkTo: LOGIN,
      footerLink: "Go back",
      formName: "verify-account",
      toFormName: "verify-account",
      buttonName: "Verify Account",
      formTitle: "Verify your account",
      description: "to continue to Groove",
      footerTitle: "Cancel verify account?",
      otherLink: {
        otherLinkPName: "Resend",
        otherLinkName: "Didn't recieve code?",
      },
    },
    inputMetadata: [
      {
        type: "text",
        name: "code",
        placeholder: "Enter 6 digit code",
      },
    ],
  },
  "forgot-password": {
    metadata: {
      linkTo: LOGIN,
      buttonName: "Send",
      footerLink: "Go back",
      formName: "forgot-password",
      toFormName: "reset-password",
      footerTitle: "Remember Password?",
      description: "to continue to Groove",
      formTitle: "Enter code to reset password",
      otherLink: {
        otherLinkTo: "#",
        otherLinkPName: "Resend",
        otherLinkName: "Didn't recieve code?",
      },
    },
    inputMetadata: [
      {
        type: "text",
        name: "code",
        placeholder: "Enter 6 digit code",
      },
    ],
  },
  "reset-password": {
    metadata: {
      linkTo: LOGIN,
      buttonName: "Send",
      footerLink: "Go back",
      formName: "reset-password",
      formTitle: "Reset password",
      footerTitle: "Remember Password?",
      description: "to continue to Groove",
    },
    inputMetadata: [
      {
        type: "password",
        name: "password",
        placeholder: "Password",
        iconVisible: "AiOutlineEye",
        iconHidden: "AiOutlineEyeInvisible",
      },
      {
        type: "password",
        name: "confirmPassword",
        iconVisible: "AiOutlineEye",
        placeholder: "Confirm password",
        iconHidden: "AiOutlineEyeInvisible",
      },
    ],
  },
};

export const loginHelpFormData: Record<string, LoginHelpDataType> = {
  "prev-forgot-password": {
    linkTo: LOGIN,
    footerLink: "Go back",
    smsButtonName: "Text Me",
    emailPlaceholder: "Email",
    emailButtonName: "Email Me",
    formTitle: "Update password",
    toFormName: "forgot-password",
    smsPlaceholder: "Phone number",
    formName: "prev-forgot-password",
    footerTitle: "Remember Password?",
    description: "to continue to Groove",
    formDescription: "How would you like to reset your password?",
    emailText:
      "We will send you an email with instructions on how to reset your password",
    smsText: "We will text you a verification code to reset your password",
  },
  "prev-verify-account": {
    linkTo: LOGIN,
    footerLink: "Go back",
    smsButtonName: "Text Me",
    emailPlaceholder: "Email",
    emailButtonName: "Email Me",
    formTitle: "Verify Account",
    toFormName: "verify-account",
    smsPlaceholder: "Phone number",
    formName: "prev-verify-account",
    description: "to continue to Groove",
    footerTitle: "Cancel verify account?",
    formDescription: "How would you like to verify your account?",
    smsText: "We will text you a verification code to verify your account",
    emailText:
      "We will send you an email with instructions on how to verify your account",
  },
};

export const thresholdsLastLognBadgeColor: ThresholdsLastLognBadgeColor[] = [
  { limit: 30, color: "green" },
  { limit: 60, color: "yellow" },
  { limit: 24 * 60, color: "orange" },
  { limit: 24 * 60 * 7, color: "red" },
  { limit: 24 * 60 * 30, color: "purple" },
  { limit: Infinity, color: "gray" },
];
