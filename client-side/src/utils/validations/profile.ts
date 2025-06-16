import * as yup from "yup";

export const editUsernameValidation = yup.object({
  username: yup
    .string()
    .trim()
    .required({ message: "Please input your new Username." })
    .min(8, { message: "Minimum 8 characters." })
    .max(50, { message: "Maximum 50 caracters." })
    .matches(/^[^@]+$/, "Input should not contain symbols.")
    .required(),
});

export const updatePasswordValidation = yup.object({
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
});

export const deleteProfileValidation = yup.object({
  confirmDelete: yup
    .string()
    .required({ message: "Type delete in the field below to confirm!" }),
});

export const creditCardValidation = yup.object({
  cardName: yup.string().required("Card name is required"),
  cardNr: yup.string().required("Card number is required"),
  cardExp: yup.string().required("Expiration date is required"),
  cardCvvNr: yup
    .string()
    .required("CVV is required")
    .matches(/^[0-9]{3,4}$/, "Invalid CVV"),
});

export const shippingAddressValidation = yup.object({
  contactName: yup.string().required("Contact name is required"),
  prefix: yup.string().optional(),
  contactNr: yup.string().required("Contact number is required"),
  street: yup.string().required("Street address is required"),
  buildNr: yup.string().optional(),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  zip: yup.string().required("Zip code is required"),
  country: yup.string().required("Country is required"),
});
