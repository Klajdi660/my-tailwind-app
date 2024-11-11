import { paths } from "./general";
import { ProfileItemList, GenderProperties, ProfileMenuItems } from "../types";
import { avatar1, avatar2, avatar3, avatar4 } from "../assets";

interface AvatarProfileList {
  id: number;
  name: string;
  size: string;
}

const { profile, editProfile } = paths;

export const avatarProfileList: AvatarProfileList[] = [
  { id: 1, name: avatar1, size: "w-28 h-28" },
  { id: 2, name: avatar2, size: "w-24 h-24" },
  { id: 3, name: avatar3, size: "w-20 h-20" },
  { id: 4, name: avatar4, size: "w-16 h-16" },
];

export const profileList: ProfileItemList[] = [
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
      type: "text",
      placeholder: "",
    },
  },
];

export const personalDetailsList = [
  {
    type: "input",
    name: "firstName",
    label: "First Name",
    props: {
      type: "text",
      placeholder: "",
    },
  },
  {
    type: "input",
    name: "lastName",
    label: "Last Name",
    props: {
      type: "text",
      placeholder: "",
    },
  },
  {
    type: "input",
    label: "Birthday",
    props: {
      type: "text",
      placeholder: "",
    },
    name: "dateOfBirth",
  },
  {
    type: "input",
    name: "gender",
    label: "Gender",
    props: {
      type: "text",
      placeholder: "",
    },
  },
  {
    type: "input",
    props: {
      type: "text",
      placeholder: "",
    },
    name: "contactNumber",
    label: "Contact Number",
  },
  {
    type: "input",
    name: "country",
    label: "Country",
    props: {
      type: "text",
      placeholder: "",
    },
  },
  {
    name: "city",
    type: "input",
    label: "City",
    props: {
      type: "text",
      placeholder: "",
    },
  },
  {
    type: "input",
    name: "address",
    label: "Address",
    props: {
      type: "text",
      placeholder: "",
    },
  },
];

export const editProfileList: ProfileItemList[] = [
  {
    btnTxt: "Save",
    formName: "profile",
    formTitle: "Profile",
  },
  {
    label: "",
    props: {
      type: "file",
      placeholder: "",
    },
    name: "imageUrl",
    type: "image_dropzone",
    containerDims: "h-32 w-32",
    borderType: "rounded-full",
  },
  {
    type: "input",
    props: {
      type: "text",
      placeholder: "",
    },
    name: "username",
    iconName: "AiOutlineUser",
    label: "Username",
  },
  {
    type: "input",
    name: "email",
    iconName: "AiOutlineMail",
    label: "Email",
    props: {
      type: "text",
      disabled: true,
      placeholder: "",
    },
  },
];

export const genderList: GenderProperties[] = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Prefer not to say",
    label: "Prefer not to say",
  },
];

export const changePasswordList = (isPasswordEnabled: boolean) => [
  {
    formName: "password",
    btnTxt: "Update Password",
    formTitle: "Change Password",
  },
  {
    type: "input",
    name: "currentPassword",
    label: "Current Password",
    props: {
      placeholder: "",
      type: "password",
      disabled: !isPasswordEnabled,
    },
  },
  {
    type: "input",
    name: "newPassword",
    label: "New Password",
    props: {
      placeholder: "",
      type: "password",
      disabled: !isPasswordEnabled,
    },
  },
  {
    type: "input",
    name: "confirmNewPassword",
    label: "Confirm New Password",
    props: {
      placeholder: "",
      type: "password",
      disabled: !isPasswordEnabled,
    },
  },
];

export const dateFormatList: string[] = [
  "DD/MM/YY",
  "DD-MM-YY",
  "DD/MM/YYYY",
  "DD-MM-YYYY",
];

export const profileMenuItems = ({
  hidden,
  logout,
  navigate,
  setModalOpen,
}: ProfileMenuItems) => [
  {
    id: "profile",
    icon: "BiUser",
    name: "Profile",
    onClick: () => {
      hidden();
      navigate(profile);
    },
  },
  {
    id: "settings",
    name: "Settings",
    icon: "AiOutlineSetting",
    onClick: () => {
      hidden();
      navigate(editProfile);
      // setModalOpen("settingsModal", true);
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
