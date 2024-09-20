import * as yup from "yup";

export const editUsernameValidation = yup
  .object({
    username: yup
      .string()
      .trim()
      .min(8, { message: "Minimum 8 characters." })
      .max(50, { message: "Maximum 50 caracters." })
      .matches(/^[^@]+$/, "Input should not contain symbols.")
      .required(),
  })
  .required();

export const personalDetailsValidation = yup
  .object({
    firstName: yup
      .string()
      .required({ message: "Please input your First Name." }),
    lastName: yup
      .string()
      .required({ message: "Please input your Last Name." }),
    dateOfBirth: yup
      .string()
      .required({ message: "Please input your Birthday." }),
  })
  .required();

export const updatePasswordValidation = yup
  .object({
    currentPassword: yup.string().required("Current Password is required!"),
    newPassword: yup
      .string()
      .required("New Password is required!")
      .min(8, { message: "Minimum 8 characters." })
      .max(250, { message: "Maximum 250 caracters." })
      .matches(/[A-Z]/, {
        message: "Must contain at least one capital letter.",
      })
      .matches(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Must contain at least one symbol.",
      }),
    confirmNewPassword: yup
      .string()
      .required("Confirm Password is required")
      .min(8, { message: "Minimum 8 characters." })
      .max(250, { message: "Maximum 250 caracters." })
      .matches(/[A-Z]/, {
        message: "Must contain at least one capital letter.",
      })
      .matches(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Must contain at least one symbol.",
      })
      .oneOf([yup.ref("newPassword")], "Passwords do not match"),
  })
  .required();

export const deleteProfileValidation = yup
  .object({
    confirmDelete: yup
      .string()
      .required({ message: "Type delete in the field below to confirm!" }),
  })
  .required();
