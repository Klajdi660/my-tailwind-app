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
        icon: "FcGoogle",
        link: "http://localhost:8080/api/auth/google",
    },
    { 
        id: 2,
        name: "Github", 
        icon: "FaGithub",
        link: "", 
    },
    // { 
    //     id: 1,
    //     name: "Google", 
    //     icon: "FcGoogle",
    //     link: "",
    // },
    // { 
    //     id: 2,
    //     name: "Github", 
    //     icon: "FaGithub",
    //     link: "",
    // }
];

export const formList: FormListMap = {
    "login": [
        {
            formName: "login",
            formTitle: "Login",
            btnTxt: "Login",
            footerTitle: "No account?",
            footerLink: "Sign up",
            linkTo: "/register"
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
        },
        {
            type: "checkbox",
            name: "remember",
            label: "Remember Me",
            props: { type: "checkbox", placeholder: "" },
        }
    ],
    "register": [
        {
            formName: "register",
            formTitle: "Create your account",
            btnTxt: "Register",
            footerTitle: "Have an account?",
            footerLink: "Sign in",
            linkTo: "/login"
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
    "verify-email": [
        {
            formName: "verify-email",
            formTitle: "Verify your account",
            btnTxt: "Verify",
            footerTitle: "Didn't recieve code?",
            footerLink: "Resend",
            linkTo: "/login"
        },
        {
            type: "code",
            name: "code1",
            props: { type: "number", placeholder: "" },
        },
        // {
        //     type: "code",
        //     name: "code2",
        //     props: { type: "number", placeholder: "" },
        // },
        // {
        //     type: "code",
        //     name: "code3",
        //     props: { type: "number", placeholder: "" },
        // },
        // {
        //     type: "code",
        //     name: "code4",
        //     props: { type: "number", placeholder: "" },
        // },
    ],
    "forgot-password": [
        {
            formName: "forgot-password",
            formTitle: "Reset Password",
            btnTxt: "Send Email",
            footerTitle: "Remember Password?",
            footerLink: "Go back",
            linkTo: "/login"
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
            formName: "reset-password",
            formTitle: "Change Password",
            btnTxt: "Reset Password",
            footerTitle: "Remember Password?",
            footerLink: "Go back",
            linkTo: "/login"
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
};
  
