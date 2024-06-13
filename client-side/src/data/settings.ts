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
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Non-Binary",
    label: "Non-Binary",
  },
  {
    value: "Prefer not to say",
    label: "Prefer not to say",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export const deleteProfileList = [
  {
    formName: "deleteAccount",
    formTitle: "Delete Account",
    btnTxt: "Delete Account",
  },
  {
    type: "input",
    name: "deleteAccount",
    label: "",
    props: {
      disabled: "",
      type: "text",
      placeholder: "Type delete to confirm",
    },
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
