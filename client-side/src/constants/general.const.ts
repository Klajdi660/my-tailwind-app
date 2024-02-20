import { FontSizesMap } from "../types/general.type";

export const paths = {
    home: "/",
    login: "login",
    register: "register",
    verifyEmail: "verify-email",
    forgotPassword: "forgot-password",
    // changePassword: "update-password/:email/:username/:h/:exp",
    resetPassword: "reset-password/:token",
    chooseUsername: "choose-username",
    myCourses: "my-courses",
    profile: "profile"
};

export const logo = {
    name: "GrooveIT",
    icon: "SlGameController",
};

export const fontSizes: FontSizesMap = {
    "extra-large": "text-3xl",
    large: "text-2xl",
    medium: "text-xl",
    small: "text-lg",
    "extra-small": "text-sm",
};  

export const accountTypes = [
    {
        id: 1,
        tabName: "Student",
        type: "Student",
    },
    {
        id: 2,
        tabName: "Instructor",
        type: "Instructor",
    },
    {
        id: 3,
        tabName: "Admin",
        type: "Admin",
    },
];