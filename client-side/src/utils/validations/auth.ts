import * as yup from "yup";
import { phone } from "phone";

export const registerValidation = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .nullable()
    .notRequired(),
  mobile: yup
    .string()
    .nullable()
    .notRequired()
    .test(
      "is-valid-mobile",
      "Please enter a valid phone number with prefix of your country, e.g. +1",
      function (value) {
        if (!value) return true;
        if (!value.startsWith("+")) {
          return this.createError({
            message: "Please add the prefix of your country, e.g. +1",
          });
        }
        const { isValid } = phone(value);
        if (!isValid) {
          return this.createError({
            message: "Please enter a valid phone number",
          });
        }
        return true;
      }
    ),
  identifier: yup
    .string()
    .required("Please enter your email or phone number")
    .test(
      "is-valid-identifier",
      "Please enter a valid email or phone number",
      function (value) {
        const isPhone = /^[\d+]/.test(value || "");
        const isEmail = (value || "").includes("@");
        return isPhone || isEmail;
      }
    ),
  fullName: yup
    .string()
    .required("Please input your full name")
    .min(4, "Please enter your correct full name"),
  username: yup
    .string()
    .required("Please input your username")
    .trim()
    .min(6, "Your username must contain minimum 6 characters")
    .max(60, "Your username must contain maximum 60 characters")
    .matches(/^[^@]+$/, "Username should not contain symbols"),
  password: yup
    .string()
    .required("Your password must contain between 8 - 60 characters")
    .min(8, "Your password must contain minimum 8 characters")
    .max(60, "Your password must contain maximum 60 characters")
    .matches(/[A-Z]/, "Your password must contain at least one capital letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Your password must contain at least one symbol"
    ),
});

export const loginValidation = yup.object({
  identifier: yup
    .string()
    .trim()
    .matches(
      /^(?!@)[^\s]+(?<!@)$/,
      "Please enter a valid email, phone number or username"
    )
    .required(),
  password: yup
    .string()
    .required({
      message: "Your password must contain between 8 - 60 characters",
    })
    .min(8, { message: "Your password must contain minimum 8 characters" })
    .max(60, {
      message: "Your password must contain maximum 60 characters",
    }),
});

export const verifyValidation = yup.object({
  code1: yup.number().required(),
});

export const forgotPassValidation = yup.object({
  email: yup
    .string()
    .email({ message: "Please enter a valid email" })
    .required({ message: "Please input your email address" }),
});

export const resetPassValidation = yup.object({
  password: yup
    .string()
    .required({
      message: "Your password must contain between 8 - 60 characters",
    })
    .min(8, { message: "Your password must contain minimum 8 characters" })
    .max(60, { message: "Your password must contain maximum 8 characters" })
    .matches(/[A-Z]/, {
      message: "Your password must contain at least one capital letter",
    })
    .matches(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Your password must contain at least one symbol",
    }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], {
      message: "Passwords must match",
    })
    .required({ message: "Please enter password again" }),
});
