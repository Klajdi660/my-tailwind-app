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
