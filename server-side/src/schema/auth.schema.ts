import { object, string, boolean, custom, TypeOf } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameRegex = /^[a-zA-Z0-9]+$/;
const uppercaseRegex = /[A-Z]/;
const sepecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

export const createLoginSchema = object({
    body: object({
        usernameOrEmail: string({
            required_error: "Username/Email is required",
        }),
        password: string({
            required_error: "Password is required",
        }),
        // remeber: boolean(),
    }),
});

export const createRegisterSchema = object({
    body: object({
        accountType: string({
            required_error: "Choose account type"
        }),
        email: string({
            required_error: "Email is required",
        }).regex(emailRegex, "Not a valid email"),
        username: string({
            required_error: "Username is required"
        })
            .regex(usernameRegex, "Username should only contain letters and numbers")
            .min(8, { message: "Username must be at least 8 characters long" }),
        firstName: string({
            required_error: "First name is required",
        }),
        lastName: string({
            required_error: "Last name is required",
        }),
        password: string({
            required_error: "Password is required",
        })
            // .refine(value => value.length >= 8, { message: "Password must be at least 8 characters long" })
            .min(8, { message: "Password must be at least 8 characters long" })
            .refine(value => uppercaseRegex.test(value), { message: "Password must contain at least one capital letter" })
            .refine(value => sepecialCharacter.test(value), { message: "Password must contain at least one special character" }),
        passwordConfirm: string({
            required_error: "Password confirmation is required",
        }),
        agreedToTerms: custom((value) => {
            return value === true;
        }, {
            message: "You must agree to the terms and conditions to register"
        })
    }).refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
});

export const createOTPCodeSchema = object({
    body: object({
        code: string({
            required_error: "OTP code is required",
        }),
        email: string(),
    }),
});

export const createForgotPasswordSchema = object({
    body: object({
        email: string({
            required_error: "Email is required",
        }).regex(emailRegex, "Not a valid email"),
    }),
});

export const createResetPasswordSchema = object({
    params: object({
        id: string({
            required_error: "Id is required",
        }),
    }),
    query: object({
        h: string({
            required_error: "h parameter is required",
        }),
        exp: string({
            required_error: "exp parameter is required",
        }),
    }),
    body: object({
        password: string({
            required_error: "Password is required",
        })
            .min(8, { message: "Password must be at least 8 characters long" })
            .refine(value => uppercaseRegex.test(value), { message: "Password must contain at least one capital letter" })
            .refine(value => sepecialCharacter.test(value), { message: "Password must contain at least one special character" }),
        passwordConfirm: string({
            required_error: "Password confirmation is required",
        }),
    }).refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
})

export type LoginInput = TypeOf<typeof createLoginSchema>["body"];
export type RegisterInput = TypeOf<typeof createRegisterSchema>["body"];
export type OTPCodeInput = TypeOf<typeof createOTPCodeSchema>["body"];
export type ForgotPasswordInput = TypeOf<typeof createForgotPasswordSchema>["body"];
export type ResetPasswordInput = TypeOf<typeof createResetPasswordSchema>;
