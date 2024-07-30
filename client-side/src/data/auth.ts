import { FormTitleList, SocialAuthList, FormItemList } from "../types";

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
    link: "http://localhost:8080/api/auth/google",
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
        placeholder: "",
      },
      name: "identifier",
      label: "Email address or Username",
    },
    {
      type: "input",
      name: "password",
      label: "Password",
      props: {
        placeholder: "",
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
      props: {
        type: "email",
        placeholder: "",
      },
      label: "Email Address",
    },
    {
      type: "input",
      name: "fullName",
      props: {
        type: "text",
        placeholder: "",
      },
      label: "Full Name",
    },
    {
      type: "input",
      name: "username",
      props: {
        type: "text",
        placeholder: "",
      },
      label: "Username",
    },
    {
      type: "input",
      name: "password",
      props: {
        type: "password",
        placeholder: "",
      },
      label: "Password",
    },
    // {
    //   type: "input",
    //   name: "passwordConfirm",
    //   label: "Confirm Password",
    //   props: {
    //     type: "password",
    //     placeholder: "",
    //   },
    // },
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
      props: {
        type: "email",
        placeholder: "",
      },
      label: "Email Address",
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
        placeholder: "",
        type: "password",
      },
      label: "New Password",
    },
    {
      type: "input",
      name: "confirmPassword",
      props: {
        placeholder: "",
        type: "confirmPassword",
      },
      label: "Confirm New Password",
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
      label: "Username",
      props: {
        type: "text",
        placeholder: "",
      },
    },
    {
      type: "input",
      name: "email",
      label: "Email",
      props: {
        disabled: true,
        type: "text",
        placeholder: "",
      },
    },
  ],
};
