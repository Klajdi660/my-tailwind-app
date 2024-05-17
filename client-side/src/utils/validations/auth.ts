import * as yup from "yup";

export const registerValidation = yup
  .object({
    email: yup
      .string()
      .email({ message: "Please enter a valid email." })
      .required({ message: "Please input your Email address." }),
    fullName: yup
      .string()
      .required({ message: "Please input your Full Name." }),
    username: yup
      .string()
      .required({ message: "Please input your Username!" })
      .trim()
      .min(6, { message: "Your username must contain minimum 6 characters." })
      .max(60, { message: "Your username must contain maximum 60 caracters." })
      .matches(/^[^@]+$/, "Username should not contain symbols."),
    password: yup
      .string()
      .required({
        message: "Your password must contain between 8 - 60 characters.",
      })
      .min(8, { message: "Your password must contain minimum 8 characters." })
      .max(60, { message: "Your password must contain maximum 60 characters." })
      .matches(/[A-Z]/, {
        message: "Your password must contain at least one capital letter.",
      })
      .matches(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Your password must contain at least one symbol.",
      }),
    // passwordConfirm: yup
    //   .string()
    //   .required({
    //     message: "Your password must contain between 8 and 60 characters.",
    //   })
    //   .test("passwords-match", "Passwords does not match", function (value) {
    //     return value === this.parent.password;
    //   }),
  })
  .required();

export const loginValidation = yup
  .object({
    identifier: yup
      .string()
      .trim()
      .matches(/^(?!@)[^\s]+(?<!@)$/, "Please enter a valid email or username.")
      .required(),
    password: yup
      .string()
      .required({
        message: "Your password must contain between 8 - 60 characters.",
      })
      .min(8, { message: "Your password must contain minimum 8 characters." })
      .max(60, {
        message: "Your password must contain maximum 60 characters.",
      }),
  })
  .required();

export const verifyValidation = yup
  .object({
    code1: yup.number().required(),
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
      .email({ message: "Please enter a valid email." })
      .required({ message: "Please input your Email address!" }),
  })
  .required();

export const resetPassValidation = yup
  .object({
    password: yup
      .string()
      .required({
        message: "Your password must contain between 8 - 60 characters.",
      })
      .min(8, { message: "Your password must contain minimum 8 characters." })
      .max(60, { message: "Your password must contain maximum 8 characters." })
      .matches(/[A-Z]/, {
        message: "Your password must contain at least one capital letter.",
      })
      .matches(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Your password must contain at least one symbol.",
      }),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], {
        message: "Passwords must match",
      })
      .required({ message: "Please enter password again." }),
  })
  .required();
