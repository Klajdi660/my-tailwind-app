import crypto from "crypto";
import config from "config";
import dayjs from "dayjs";
import { redisCLI } from "../../clients";
import { generateUniqueOTP, updateUserPassword } from "./auth.service";
import { getUserById, getUserByEmail, getUserByEmailOrUsername, createUser } from "../User/user.service";
import { signToken, log, sendEmail } from "../../utils";
import { AppParams, UserParams } from "../../types";
import { EMAIL_PROVIDER } from "../../constants";

const { client_url } = config.get<AppParams>("app");

export const loginHandler = async (usernameOrEmail: string, password: string, rememberMe: boolean) => {   
    const user = await getUserByEmailOrUsername(usernameOrEmail, usernameOrEmail);
    if (!user) {
        return { error: true, message: "User is not Registered with us, please SignUp to continue." };
    }
    
    if (user && user.provider !== EMAIL_PROVIDER.Email) {
        return { error: true, message: `That email address is already in use using ${user.provider} provider.` };
    }

    const expectedHash = crypto
        .createHash("sha1")
        .update(password + user.username)
        .digest("hex");    
    if (user.hash !== expectedHash) {
        return { error: true, message: "Invalid Password! Please enter valid password." };
    }

    const { access_token, refresh_token } = await signToken(user);

    if (rememberMe) {
        const maxAge = 30 * 24 * 60 * 60 * 1000;
        return { maxAge, access_token };
    }

    return {
        lToken: access_token,
        rToken: refresh_token
    }
};

export const registerHandler = async (data: UserParams) => {
    const { agreedToTerms, email, username, password, isSubscribed } = data;

    if (!agreedToTerms) {
        return { error: true, message: "You must agree to the terms and conditions to register." };
    }

    const existingUser = await getUserByEmailOrUsername(email, username);
    if (existingUser) {
        log.info(`[existingUser]: ${JSON.stringify({ action: "createUser existingUser", data: existingUser })}`);
        return { error: true, message: "User with the provided email or username already exists" };
    }

    const hash = crypto
        .createHash("sha1")
        .update(password + username)
        .digest("hex");

    const user_registration: UserParams = {
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
        
    return { error: false, message: "A message with a code has been sent to your email. Please enter this code to proceed" };
};

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

export const logoutHandler = async (user: any) => {
    await redisCLI.del(`session_${user.id}`);
    return { error: false, message: "Logout success" };
};

export const forgotPasswordHandler = async (email: string) => {
    const user = await getUserByEmail(email);
    if (!user) {
        return { error: true, message: `This email: '${email}' is not register with us. Please enter a valid email.` };
    }

    const hash = crypto
        .createHash("sha1")
        .update(email + user.username)
        .digest("hex")
    const expirationTime = dayjs().add(60, 's').toISOString();
    
    // const tokenData = {
    //     id: user.id,
    //     h: hash,
    //     exp: expirationTime
    // };
    // const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');
    const { refresh_token } = await signToken(user);
    const url = `${client_url}/reset-password/${refresh_token}`;

    let templatePath= "ForgotPassword";
    const templateData = {
        title: "Reset Password",
        url: url,
        urlTitle: "Reset Password",
    };
    
    const mailSent = await sendEmail(templatePath, templateData);
    if (!mailSent) {
        return { error: true, message: "Somenthing went wrong. Email not sent." };
    }
        
    return { error: false, message: "Email Sent Successfully, Please Check Your Email to Continue Further." };
};

export const resetPasswordHandler = async (token: string, password: string) => {
    const decodedToken = JSON.parse(atob(token));
    const { id, h, exp } = decodedToken;
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

    const url = `${client_url}/login`;
    let templatePath= "ResetPassword";
    const templateData = {
        title: "Password Update Confirmation",
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        url: url,
        urlTitle: "Login",
    };

    const mailSent = await sendEmail(templatePath, templateData);
    if (!mailSent) {
        return { error: true, message: "Somenthing went wrong. Email not sent." };
    }

    return { error: false, message: "Password Reset Successful" };
};
