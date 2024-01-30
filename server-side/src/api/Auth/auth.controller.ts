import crypto from "crypto";
import dayjs from "dayjs";
import { redisCLI } from "../../clients";
import { 
    getUserByEmail, 
    getUserByEmailOrUsername, 
    createUser, 
    generateUniqueOTP, 
    getUserById, 
    updateUserPassword, 
} from "./auth.service";
import { signToken, log, sendEmail } from "../../utils";
import { UserTypesParams } from "../../types";

// Controller for login user
export const loginHandler = async (usernameOrEmail: string, password: string) => {
    // Get the user from the collection
    const user: any = await getUserByEmailOrUsername(usernameOrEmail, usernameOrEmail);

    // Check if user exist
    if (!user) {
        return { error: true, message: "User is not Registered with us, please SignUp to continue." };
    }

    // Check if password is correct
    const expectedHash = crypto
        .createHash("sha1")
        .update(password + user.username)
        .digest("hex");
    
    if (user.hash !== expectedHash) {
        return { error: true, message: "Invalid Password! Please enter valid password." };
    }

    // Create the Access and refresh Tokens
    const { access_token, refresh_token } = await signToken(user);

    // Send Access Token
    return {
        lToken: access_token,
        rToken: refresh_token
    }
};

// Controller for register user
export const registerHandler = async (data: UserTypesParams) => {
    const { agreedToTerms, email, username, password } = data;

    // Agreed to terms
    if (!agreedToTerms) {
        return { error: true, message: "You must agree to the terms and conditions to register." };
    }

    // check user in database
    const existingUser: any = await getUserByEmailOrUsername(email, username);

    if (existingUser) {
        log.info(`[User]: ${JSON.stringify({ action: "createUser existingUser", data: existingUser })}`);
        return { error: true, message: "User with the provided email or username already exists" };
    }

    const hash = crypto
        .createHash("sha1")
        .update(password + username)
        .digest("hex");

    const user_registration: UserTypesParams = {
        ...data,
        password: hash,
        passwordConfirm: hash
    };
 
    // create random code to sent in email
    const otp = generateUniqueOTP();

    // put code and expiredCodeAt in user_registration 
    user_registration["otpCode"] = otp;
    user_registration["expiredCodeAt"] = dayjs().add(60, 's');

    // put user in redis
    const addedToRedis = await redisCLI.setnx(`register_pending_${email}`, JSON.stringify(user_registration));
    if (!addedToRedis) {
        return { error: true, message: "Email already registered." };
    }

    await redisCLI.expire(`register_pending_${email}`, 3600);

    // send otp code in user email
    const { firstName, lastName, otpCode } = user_registration;
    let subject = "OTP Verification Email";
    let templatePath= "OTP";
    const templateData = {
        title: subject,
        name: `${firstName} ${lastName}`,
        code: otpCode
    };
    
    const mailSent = await sendEmail(templatePath, templateData);
    if (!mailSent) {
        return { error: true, message: "Somenthing went wrong. Email not sent." };
    }
        
    return { error: false, message: "A message with a code has been sent to your phone number. Please enter this code to proceed" };
};

// Controller for confirm user
export const confirmRegisterHandler = async (code: string, email: string) => {
    let redisObj: any = await redisCLI.get(`register_pending_${email}`);
    redisObj = JSON.parse(redisObj);

    const { otpCode, expiredCodeAt } = redisObj;

    if (!redisObj) {
        return { error: true, message: "Confirmation time expired!" };
    }

    if (code !== otpCode) {
        return { error: true, message: "Confirmation code incorrect!" };
    }

    // check if otp code is expired
    const currentDateTime = dayjs();
    const expiresAtDateTime = dayjs(expiredCodeAt);
    const isExpired = currentDateTime.isAfter(expiresAtDateTime);

    if (isExpired) {
        log.error(`[confirmUser]: ${JSON.stringify({ action: "expired User", data: redisObj })}`);
        return { error: true, message: "Your OTP code has expired. Please request a new OTP code" };
    }

    // Create the user
    const user = await createUser(redisObj, /*approved*/);

    if (!user) {
        console.log(JSON.stringify({ action: "Confirm createUser Req", data: user }))
        return { error: true, message: "Failed to register user!" };
    }

    await redisCLI.del(`register_pending_${email}`);

    return {
        error: false,
        message: "Congratulation! Your account has been created."
    }
};

// Controller for logout user
export const logoutHandler = async (user: any) => {
    await redisCLI.del(`session_${user.id}`);
    return { error: false, message: "Logout success" };
};

export const forgotPasswordHandler = async (email: string) => {
    const user: any = await getUserByEmail(email);

    if (!user) {
        return { error: true, message: `This email: '${email}' is not register with us. Please enter a valid email.` };
    }

    const hash = crypto
        .createHash("sha1")
        .update(email + user.username)
        .digest("hex")
    const expirationTime = dayjs().add(60, 's').toISOString();
    console.log('hash :>> ', hash);
    console.log('expirationTime :>> ', expirationTime);
    // const token = {
    //     hash,
    //     expirationTime
    // }
    
    const url = `http://localhost:3000/update-password/${user.id}/${hash}/${expirationTime}`;
    
    let templatePath= "ForgotPassword";
    const templateData = {
        title: "Password Reset",
        subject: "Your Link for email verification is:",
        url: url,
        urlTitle: "Reset Password",
        subject2: "Please click this url to reset your password."
    };
    
    const mailSent = await sendEmail(templatePath, templateData);

    if (!mailSent) {
        return { error: true, message: "Somenthing went wrong. Email not sent." };
    }
        
    return { error: false, message: "Email Sent Successfully, Please Check Your Email to Continue Further." };
};

export const resetPasswordHandler = async (id: string, h: string, exp: string, password: string) => {
    const user = await getUserById(id) as any;

    if (!user) {
        return { error: true, message: "User is not Registered with us, please SignUp to continue." };
    }

    const expectedHash = crypto
        .createHash("sha1")
        .update(user.email + user.username)
        .digest("hex");
    if (h !== expectedHash) {
        return { error: true, message: "Token is Invalid!" };
    }

    if (dayjs(exp).isBefore(dayjs())) {
        return { error: true, message: "Your token has expired. Please attempt to reset your password again." };
    }

    const hash = crypto
        .createHash("sha1")
        .update(password + user.username)
        .digest("hex");

    const newPassword = await updateUserPassword(hash, id);
    if (!newPassword) {
        return { error: true, message: "Some Error in Updating the Password" };
    }

    const url = `http://localhost:3000/login`;
    
    let templatePath= "ResetPassword";
    const templateData = {
        title: "Login",
        subject: "Login with your new password.",
        url: url,
        urlTitle: "Login",
    };

    const mailSent = await sendEmail(templatePath, templateData);

    if (!mailSent) {
        return { error: true, message: "Somenthing went wrong. Email not sent." };
    }

    return { error: true, message: "Password Reset Successful" };
};
