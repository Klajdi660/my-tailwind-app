export const profileList = [
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

export const genderList = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "nonBinary",
    label: "Non-Binary",
  },
  {
    value: "preferNotToSay",
    label: "Prefer not to say",
  },
  {
    value: "other",
    label: "Other",
  },
];

export const changePasswordList = [
  {
    formName: "password",
    formTitle: "Change Password",
    btnTxt: "Update Password",
  },
  {
    type: "input",
    name: "newPassword",
    label: "New Password",
    props: {
      disabled: "",
      type: "password",
      placeholder: "",
    },
  },
  {
    type: "input",
    name: "confirmNewPassword",
    label: "Confirm New Password",
    props: {
      disabled: "",
      type: "password",
      placeholder: "",
    },
  },
];

export const dateFormatList = [
  "DD/MM/YYYY",
  "DD/MM/YY",
  "DD-MM-YYYY",
  "DD-MM-YY",
];
