import * as yup from "yup";

export const registerValidation = yup
  .object({
    email: yup
      .string()
      .email({ message: "Must be a valid email." })
      .required(),
    password: yup
      .string()
      .min(8, { message: "Minimum 8 characters." })
      .max(250, { message: "Maximum 250 caracters." })
      .matches(/[A-Z]/, { message: "Must contain at least one capital letter." })
      .matches(/[!@#$%^&*(),.?":{}|<>]/, { message: "Must contain at least one symbol." })
      .required(),
    username: yup
      .string()
      .trim()
      .min(8, { message: "Minimum 8 characters." })
      .max(50, { message: "Maximum 50 caracters." })
      .matches(/^[^@]+$/, "Input should not contain symbols.")
      .required(),
  })
  .required();

export const loginValidation = yup
  .object({
    username: yup
      .string()
      .trim()
      .matches(/^(?!@)[^\s]+(?<!@)$/, "Invalid email or username")
      .required(),
    password: yup
      .string()
      .min(8, { message: "Minimum 8 characters." })
      .max(250, { message: "Maximum 250 caracters." })
      .required(),
  })
  .required();

export const verifyValidation = yup
  .object({
    code1: yup
      .number()
      .required(),
    // code2: yup
    //   .number()
    //   .required(),
    // code3: yup
    //   .number()
    //   .required(),
    // code4: yup
    //   .number()
    //   .required(),
    // code5: yup
    //   .number()
    //   .required(),
    // code6: yup
    //   .number()
    //   .required()
  })
  .required();

export const forgotPassValidation = yup
  .object({
    email: yup
      .string()
      .email({ message: "Must be a valid email." })
      .required(),
  })
  .required();

export const resetPassValidation = yup
  .object({
    password: yup
      .string()
      .min(8, { message: "Minimum 8 characters." })
      .max(250, { message: "Maximum 250 caracters." })
      .matches(/[A-Z]/, { message: "Must contain at least one capital letter." })
      .matches(/[!@#$%^&*(),.?":{}|<>]/, { message: "Must contain at least one symbol." })
      .required(),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), undefined], { message: 'Passwords must match' })
      .required(),
  })
  .required();
