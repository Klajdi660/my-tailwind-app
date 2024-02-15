import * as yup from "yup";

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
