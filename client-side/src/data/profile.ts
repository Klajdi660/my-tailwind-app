import { ProfileItemList, GenderProperties, ProfileMenuItems } from "../types";

export const profileList: ProfileItemList[] = [
  {
    formName: "profile",
    formTitle: "Profile",
    btnTxt: "Save",
  },
  {
    type: "image_dropzone",
    name: "imageUrl",
    label: "",
    containerDims: "h-32 w-32",
    borderType: "rounded-full",
    props: {
      type: "file",
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
    name: "email",
    label: "Email",
    props: {
      disabled: true,
      type: "text",
      placeholder: "",
    },
  },
];

export const genderList: GenderProperties[] = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "prefernottosay",
    label: "Prefer not to say",
  },
];

export const changePasswordList = (isPasswordEnabled: boolean) => [
  {
    formName: "password",
    formTitle: "Change Password",
    btnTxt: "Update Password",
  },
  {
    type: "input",
    name: "currentPassword",
    label: "Current Password",
    props: {
      disabled: !isPasswordEnabled,
      type: "password",
      placeholder: "",
    },
  },
  {
    type: "input",
    name: "newPassword",
    label: "New Password",
    props: {
      disabled: !isPasswordEnabled,
      type: "password",
      placeholder: "",
    },
  },
  {
    type: "input",
    name: "confirmNewPassword",
    label: "Confirm New Password",
    props: {
      disabled: !isPasswordEnabled,
      type: "password",
      placeholder: "",
    },
  },
];

export const dateFormatList: string[] = [
  "DD/MM/YYYY",
  "DD/MM/YY",
  "DD-MM-YYYY",
  "DD-MM-YY",
];

export const profileMenuItems = ({
  navigate,
  hidden,
  logout,
}: ProfileMenuItems) => [
  {
    id: "profile",
    name: "Profile",
    icon: "BiUser",
    onClick: () => {
      navigate("/profile");
      hidden();
    },
  },
  {
    id: "settings",
    name: "Settings",
    icon: "AiOutlineSetting",
    onClick: () => {
      navigate("/settings");
      hidden();
    },
  },
  {
    id: "logout",
    name: "Sign out",
    icon: "LiaSignOutAltSolid",
    onClick: () => {
      logout();
      hidden();
    },
  },
];
