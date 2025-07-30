import * as yup from "yup";
import { FormName } from "../../types";

const userRegex: Record<string, RegExp> = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phoneNumberRegex: /^\+?\d{7,15}$/,
  isPhoneNumberRegex: /^\d/,
  usernameRegex: /^[a-zA-Z0-9_]{3,30}$/,
};

export const registerValidation = yup.object({
  identifier: yup
    .string()
    .required("Please enter a valid email or phone number")
    .test(
      "is-valid-identifier",
      "Please enter a valid email or phone number",
      function (value) {
        const { path, createError } = this;

        if (!value) return false;

        const { emailRegex, phoneNumberRegex, isPhoneNumberRegex } = userRegex;

        if (emailRegex.test(value)) return true;
        if (phoneNumberRegex.test(value)) return true;

        if (value.includes("@") && !emailRegex.test(value)) {
          return createError({
            path,
            message: "Please enter a valid email address",
          });
        }

        if (isPhoneNumberRegex.test(value)) {
          if (phoneNumberRegex.test(value)) {
            return true;
          } else {
            return createError({
              path,
              message: "Please enter a valid phone number",
            });
          }
        }
      }
    ),
  username: yup
    .string()
    .required("Please input your username")
    .trim()
    .min(6, "Your username must contain minimum 6 characters")
    .max(60, "Your username must contain maximum 60 characters")
    .matches(/^[^@]+$/, "Username should not contain symbols"),
  fullname: yup
    .string()
    .required("Please input your full name")
    .min(4, "Please enter your correct full name"),
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
    .required("Please enter a valid email, phone number or username")
    .test(
      "is-valid-identifier",
      "Please enter a valid email, phone number or username",
      function (value) {
        const { path, createError } = this;

        if (!value) return false;

        const {
          emailRegex,
          phoneNumberRegex,
          isPhoneNumberRegex,
          usernameRegex,
        } = userRegex;

        if (emailRegex.test(value)) return true;
        if (phoneNumberRegex.test(value)) return true;
        if (usernameRegex.test(value)) return true;

        if (value.includes("@") && !emailRegex.test(value)) {
          return createError({
            path,
            message: "Please enter a valid email address",
          });
        }

        if (isPhoneNumberRegex.test(value)) {
          if (phoneNumberRegex.test(value)) {
            return true;
          } else {
            return createError({
              path,
              message: "Please enter a valid phone number",
            });
          }
        }

        if (!usernameRegex.test(value)) {
          return createError({
            path,
            message: "Please enter a valid username",
          });
        }
      }
    ),
  password: yup
    .string()
    .required("Your password must contain between 5 - 60 characters")
    .min(5, "Your password must contain between 5 - 60 characters")
    .max(60, "Your password must contain between 5 - 60 characters"),
});

export const verifyValidation = yup.object({
  code1: yup.number().required(),
});

export const emailOrPhoneValidation = yup.object().shape({
  email: yup.string().when("$selectedMethod", {
    is: "email",
    then: (schema) =>
      schema
        .email("Please enter a valid email")
        .required("Please input your email address"),
    otherwise: (schema) => schema.notRequired(),
  }),
  phoneNumber: yup.string().when("$selectedMethod", {
    is: "sms",
    then: (schema) =>
      schema.required("Please input your phone number with country prefix"),
    otherwise: (schema) => schema.notRequired(),
  }),
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

export const verifyCodeValidation = yup.object({
  code: yup
    .string()
    .required("Please enter 6 digit code")
    .matches(/^\d{6}$/, "Code must be exactly 6 digits"),
});

export const formValidation: Record<FormName, any> = {
  register: registerValidation,
  login: loginValidation,
  "verify-account": verifyCodeValidation,
  "reset-password": verifyCodeValidation,
};
