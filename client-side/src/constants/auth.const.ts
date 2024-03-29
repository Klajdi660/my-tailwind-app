import { TitleMap, FormListMap } from "../types/auth.type";

export const titles: TitleMap = {
  login: "Sign In",
  register: "Create your account",
  "/verify-email": "Verify Email",
  "/reset-password": "Reset Password",
  "/verify-reset-password": "Complete Reset Password",
};

export const socialAuthList = [
  {
    id: 1,
    name: "Google",
    icon: "FcGoogle",
    link: "http://localhost:8080/api/auth/google",
  },
  //   {
  //     id: 2,
  //     name: "Playstation",
  //     icon: "FaPlaystation",
  //     link: "",
  //   },
  //   {
  //     id: 3,
  //     name: "Xbox",
  //     icon: "FaXbox",
  //     link: "",
  //   },
  //   {
  //     id: 4,
  //     name: "Nintendo",
  //     icon: "BsNintendoSwitch",
  //     link: "",
  //   },
];

export const formList: FormListMap = {
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
      name: "username",
      iconName: "AiOutlineMail",
      label: "Email address or Username",
      props: { type: "username", placeholder: "" },
    },
    {
      type: "input",
      name: "password",
      label: "Password",
      props: { type: "password", placeholder: "" },
    },
    {
      type: "checkbox",
      name: "remember",
      label: "Remember Me",
      props: { type: "checkbox", placeholder: "" },
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
      props: { type: "email", placeholder: "" },
    },
    {
      type: "input",
      name: "fullName",
      label: "Full Name",
      props: { type: "fullName", placeholder: "" },
    },
    {
      type: "input",
      name: "username",
      iconName: "AiOutlineUser",
      label: "Username",
      props: { type: "text", placeholder: "" },
    },
    {
      type: "input",
      name: "password",
      label: "Password",
      props: { type: "password", placeholder: "" },
    },
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
    {
      type: "code",
      name: "code1",
      props: { type: "number", placeholder: "" },
    },
    // {
    //   type: "code",
    //   name: "code2",
    //   props: { type: "number", placeholder: "" },
    // },
    // {
    //   type: "code",
    //   name: "code3",
    //   props: { type: "number", placeholder: "" },
    // },
    // {
    //   type: "code",
    //   name: "code4",
    //   props: { type: "number", placeholder: "" },
    // },
  ],
  "forgot-password": [
    {
      formType: "auth",
      formName: "forgot-password",
      formTitle: "Reset Password",
      description: "to continue to Groove",
      btnTxt: "Send Email",
      footerTitle: "Remember Password?",
      footerLink: "Go back",
      linkTo: "/login",
    },
    {
      type: "input",
      name: "email",
      label: "Email Address",
      props: { type: "email", placeholder: "" },
    },
  ],
  "reset-password": [
    {
      formType: "auth",
      formName: "reset-password",
      formTitle: "Change Password",
      description: "to continue to Groove",
      btnTxt: "Change Password",
      footerTitle: "Remember Password?",
      footerLink: "Go back",
      linkTo: "/login",
    },
    {
      type: "input",
      name: "password",
      label: "Password",
      props: { type: "password", placeholder: "" },
    },
    {
      type: "input",
      name: "confirmPassword",
      label: "Confirm Password",
      props: { type: "confirmPassword", placeholder: "" },
    },
  ],
  "password-code": [
    {
      formType: "auth",
      formName: "password-code",
      formTitle: "Enter Code to Reset Password",
      description: "to continue to Groove",
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
