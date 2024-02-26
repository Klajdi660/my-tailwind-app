import { Request, Response } from "express";
import crypto from "crypto";
import config from "config";
import dayjs from "dayjs";
import { redisCLI } from "../clients";
import { 
    getUserById, 
    getUserByEmail, 
    getUserByEmailOrUsername, 
    createUser, 
    createVerificationCode,
    getAndUpdateUser,
} from "../services/user.service";
import { signToken, log, sendEmail } from "../utils";
import { AppParams, UserParams } from "../types";
import { EMAIL_PROVIDER } from "../constants";

const { client_url } = config.get<AppParams>("app");

export const loginHandler = async (req: Request, res: Response) => {
    const { usernameOrEmail, password, rememberMe } = req.body;   

    const user = await getUserByEmailOrUsername(usernameOrEmail, usernameOrEmail);
    if (!user) {
        res.json({ error: true, message: "User is not Registered with us, please SignUp to continue." });
    }

    if (user && user.provider !== EMAIL_PROVIDER.Email) {
        res.json({ error: true, message: `That email address is already in use using ${user.provider} provider.` });
    }

    const expectedHash = crypto
        .createHash("sha1")
        .update(password + user.username)
        .digest("hex");    
    if (user.password !== expectedHash) {
        res.json({ error: true, message: "Invalid Password! Please enter valid password." });
    }

    if (!user.verified) {
        const otp = createVerificationCode();

        const user_registration = {
            otpCode: otp,
            expiredCodeAt: dayjs().add(60, 's'),
        };

        const addedToRedis = await redisCLI.setnx(`register_pending_${user.email}`, JSON.stringify(user_registration));
        if (!addedToRedis) {
            res.json({ error: true, message: "Email already registered." });
        }

        await redisCLI.expire(`register_pending_${user.email}`, 3600);

        const extra = JSON.parse(user.extra);
        let subject = "OTP Verification Email";
        let templatePath= "OTP";
        const templateData = {
            title: subject,
            name: `${extra.firstName} ${extra.lastName}`,
            code: otp
        };
        
        const mailSent = await sendEmail(templatePath, templateData);
        if (!mailSent) {
            res.json({ error: true, message: "There was an error sending email, please try again" });
        }
        
        res.json({ 
            error: true, 
            message: `Email ${user.email} not verified. An email with a verification code has been sent to your email` 
        });
    }

    
    const { access_token, refresh_token } = await signToken(user);

    res.json({
        error: false,
        lToken: access_token,
        rToken: refresh_token
    });
};

export const registerHandler = async (req: Request, res: Response) => {
    const { agreedToTerms, email, username, password } = req.body;

    if (!agreedToTerms) {
        res.json({ error: true, message: "You must agree to the terms and conditions to register." });
    }

    const existingUser = await getUserByEmailOrUsername(email, username);
    if (existingUser) {
        log.info(`${JSON.stringify({ action: "createUser existingUser", data: existingUser })}`);
        res.json({ error: true, message: "User with the provided email or username already exists" });
    }

    const hash = crypto
        .createHash("sha1")
        .update(password + username)
        .digest("hex");

    const user_registration: UserParams = {
        ...req.body,
        password: hash,
        passwordConfirm: hash
    };
 
    // create random code to sent in email
    const otp = createVerificationCode();

    // put code and expiredCodeAt in user_registration 
    user_registration["otpCode"] = otp;
    user_registration["expiredCodeAt"] = dayjs().add(60, 's');

    // put user in redis
    const addedToRedis = await redisCLI.setnx(`register_pending_${email}`, JSON.stringify(user_registration));
    if (!addedToRedis) {
        res.json({ error: true, message: "Email already registered." });
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
        res.json({ error: true, message: "There was an error sending email, please try again" });
    }
        
    res.json({ 
        error: false, 
        message: "An email with a verification code has been sent to your email. Please enter this code to proceed" 
    });
};

export const verifyEmailHandler = async (req: Request, res: Response) => {
    const { code, email } = req.body;
    
    let redisObj: any = await redisCLI.get(`register_pending_${email}`);
    redisObj = JSON.parse(redisObj);
    if (!redisObj) {
        res.json({ error: true, message: "Confirmation time expired!" });
    }

    const { otpCode, expiredCodeAt } = redisObj;

    if (code !== otpCode) {
        res.json({ error: true, message: "Confirmation code incorrect!" });
    }

    // check if otp code is expired
    const currentDateTime = dayjs();
    const expiresAtDateTime = dayjs(expiredCodeAt);
    const isExpired = currentDateTime.isAfter(expiresAtDateTime);
    if (isExpired) {
        log.error(`${JSON.stringify({ action: "expired User", data: redisObj })}`);
        res.json({ error: true, message: "Your OTP code has expired. Please request a new OTP code" });
    }

    const existingUser = await getUserByEmail(email);
    let user;
    let verified = true;

    if (existingUser) {
        user = await getAndUpdateUser(existingUser.id, { verified });
        if (!user) {
            console.log(JSON.stringify({ action: "Confirm updateUser Req", data: user }))
            res.json({ error: true, message: "Failed to update user!" });
        }
    } else {
        user = await createUser(redisObj, verified);
        if (!user) {
            console.log(JSON.stringify({ action: "Confirm createUser Req", data: user }))
            res.json({ error: true, message: "Failed to register user!" });
        }
    }

    await redisCLI.del(`register_pending_${email}`);

    res.json({
        error: false,
        message: "Congratulation! Your account has been created."
    });
};

export const logoutHandler = async (req: Request, res: Response) => {
    const { user } = res.locals;

    await redisCLI.del(`session_${user.id}`);
    
    res.json({ error: false, message: "Logout success" });
};

export const forgotPasswordHandler = async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
        res.json({ error: true, message: `This email: '${email}' is not register with us. Please enter a valid email.` });
    }

    // const hash = crypto
    //     .createHash("sha1")
    //     .update(email + user.username)
    //     .digest("hex")
    // const expirationTime = dayjs().add(60, 's').toISOString();
    
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
        res.json({ error: true, message: "Somenthing went wrong. Email not sent." });
    }
        
    res.json({ error: false, message: "Email Sent Successfully, Please Check Your Email to Continue Further." });
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;

    const decodedToken = JSON.parse(atob(token));
    const { id, h, exp } = decodedToken;

    const user = await getUserById(id);
    if (!user) {
        res.json({ error: true, message: "User is not Registered with us, please SignUp to continue." });
    }

    const expectedHash = crypto
        .createHash("sha1")
        .update(user.email + user.username)
        .digest("hex");
    if (h !== expectedHash) {
        res.json({ error: true, message: "Token is Invalid!" });
    }

    if (dayjs(exp).isBefore(dayjs())) {
        res.json({ error: true, message: "Your token has expired. Please attempt to reset your password again." });
    }

    const hash = crypto
        .createHash("sha1")
        .update(password + user.username)
        .digest("hex");

    // const newPassword = await updateUserPassword(hash, id);
    const newPassword = await getAndUpdateUser(id, { password: hash });
    if (!newPassword) {
        res.json({ error: true, message: "Some Error in Updating the Password" });
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
        res.json({ error: true, message: "Somenthing went wrong. Email not sent." });
    }

    res.json({ error: false, message: "Password Reset Successful" });
};
