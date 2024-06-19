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
      formType: "auth",
      formName: "login",
      formTitle: "Login",
      description: "to continue to Groove",
      btnTxt: "Login",
      footerTitle: "Don't have an Account?",
      footerLink: "Sign up",
      linkTo: "/register",
    },
    {
      type: "input",
      name: "identifier",
      label: "Email address or Username",
      props: {
        type: "text",
        placeholder: "",
      },
    },
    {
      type: "input",
      name: "password",
      label: "Password",
      props: {
        type: "password",
        placeholder: "",
      },
    },
    {
      type: "checkbox",
      name: "remember",
      label: "Remember Me",
      props: {
        type: "checkbox",
        placeholder: "",
      },
    },
  ],
  register: [
    {
      formType: "auth",
      formName: "register",
      formTitle: "Create your account",
      description: "to continue to Groove",
      btnTxt: "Register",
      footerTitle: "Already have an account?",
      footerLink: "Sign in",
      linkTo: "/login",
    },
    {
      type: "input",
      name: "email",
      label: "Email Address",
      props: {
        type: "email",
        placeholder: "",
      },
    },
    {
      type: "input",
      name: "fullName",
      label: "Full Name",
      props: {
        type: "text",
        placeholder: "",
      },
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
      name: "password",
      label: "Password",
      props: {
        type: "password",
        placeholder: "",
      },
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
      formName: "verify-email",
      formTitle: "Verify your account",
      description: "to continue to Groove",
      btnTxt: "Verify Email",
      footerTitle: "Remember Password?",
      footerLink: "Go back",
      linkTo: "/login",
    },
  ],
  "forgot-password": [
    {
      formType: "auth",
      formName: "forgot-password",
      formTitle: "Reset Password",
      description:
        "Enter your email address, and we'll send a link to reset password to continue to Groove",
      btnTxt: "Reset Password",
      footerTitle: "Remember Password?",
      footerLink: "Go back",
      linkTo: "/login",
    },
    {
      type: "input",
      name: "email",
      label: "Email Address",
      props: {
        type: "email",
        placeholder: "",
      },
    },
  ],
  "reset-password": [
    {
      formType: "auth",
      formName: "reset-password",
      formTitle: "Choose New Password",
      description: "to continue to Groove",
      btnTxt: "Reset Password",
      footerTitle: "Remember Password?",
      footerLink: "Go back",
      linkTo: "/login",
    },
    {
      type: "input",
      name: "password",
      label: "New Password",
      props: {
        type: "password",
        placeholder: "",
      },
    },
    {
      type: "input",
      name: "confirmPassword",
      label: "Confirm New Password",
      props: {
        type: "confirmPassword",
        placeholder: "",
      },
    },
  ],
  "password-code": [
    {
      formType: "auth",
      formName: "password-code",
      formTitle: "Continue Reset Password",
      description: "Enter code to continue to Groove",
      btnTxt: "Reset Password",
      footerTitle: "Remember Password?",
      footerLink: "Go back",
      linkTo: "/login",
    },
  ],
  profile: [
    {
      formName: "profile",
      formTitle: "Profile",
      btnTxt: "Save",
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
