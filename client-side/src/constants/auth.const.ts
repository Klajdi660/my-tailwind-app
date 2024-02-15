import { TitleMap, FormListMap } from "../types/general.type";

export const titles: TitleMap = {
    "login": "Sign In",
    "register": "Create your account",
    "/verify-email": "Verify Email",
    "/reset-password": "Reset Password",
    "/verify-reset-password": "Complete Reset Password",
};

export const socialAuthList = [
    { 
        id: 1,
        name: "Google", 
        icon: "FcGoogle"
    },
    { 
        id: 2,
        name: "Github", 
        icon: "FaGithub" 
    },
];

export const formList: FormListMap = {
    "login": [
        {
            formName: "Login",
            formTitle: "Login",
            btnTxt: "Login"
        },
        {
            type: "input",
            name: "username",
            label: "Email address or Username",
            props: { type: "username", placeholder: "" },
        },
        {
            type: "input",
            name: "password",
            label: "Password",
            props: { type: "password", placeholder: "" },
        }
    ],
    "register": [
        {
            formName: "Register",
            formTitle: "Create your account",
            btnTxt: "Register"
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
            label: "Username",
            props: { type: "text", placeholder: "" },
        },    
        {
            type: "input",
            name: "password",
            label: "Password",
            props: { type: "password", placeholder: "" },
        }
    ],
    "verify-email": [],
    "forgot-password": [
        {
            type: "input",
            name: "email",
            label: "Email Address",
            props: { type: "email", placeholder: "" },
        },
    ],
    "reset-password": [
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
};
  