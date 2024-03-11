import { Request, Response } from "express";
import crypto from "crypto";
import config from "config";
import dayjs from "dayjs";
import { redisCLI } from "../clients";
import { 
    getUserByEmail, 
    getUserByEmailOrUsername, 
    createUser, 
    createVerificationCode,
    getAndUpdateUser,
} from "../services/user.service";
import { 
    signToken, 
    log, 
    sendEmail, 
    accessTokenCookieOptions, 
    refreshTokenCookieOptions, 
    loginTokenCookieOptions
} from "../utils";
import { AppParams, UserParams } from "../types";
import { EMAIL_PROVIDER } from "../constants";

const { client_url } = config.get<AppParams>("app");

export const otpSendHandler = async (req: Request, res: Response) => {};

export const loginHandler = async (req: Request, res: Response) => {
    const { identifier, password, remember } = req.body;   

    const user = await getUserByEmailOrUsername(identifier, identifier);
    if (!user) {
        return res.json({ error: true, message: "User is not Registered with us, please Sign Up to continue." });
    }

    if (user && user.provider !== EMAIL_PROVIDER.Email) {
        return res.json({ error: true, message: `That email address is already in use using ${user.provider} provider.` });
    }

    const expectedHash = crypto
        .createHash("sha1")
        .update(password + user.username)
        .digest("hex");    
    if (user.password !== expectedHash) {
        return res.json({ error: true, message: "Invalid Password! Please enter valid password." });
    }

    if (!user.verified) {
        const code = createVerificationCode();

        const user_registration = {
            otpCode: code,
            expiredCodeAt: dayjs().add(60, 's'),
        };

        const addedToRedis = await redisCLI.setnx(`verify_email_pending_${user.email}`, JSON.stringify(user_registration));
        if (!addedToRedis) {
            return res.json({ error: true, message: "Email already registered." });
        }

        await redisCLI.expire(`register_pending_${user.email}`, 3600);

        const extra = JSON.parse(user.extra);
        let subject = "OTP Verification Email";
        let templatePath= "OTP";
        const templateData = {
            title: subject,
            name: `${extra.firstName} ${extra.lastName}`,
            code
        };
        
        const mailSent = await sendEmail(templatePath, templateData);
        if (!mailSent) {
            return res.json({ error: true, message: "There was an error sending email, please try again" });
        }
        
        return res.json({ 
            error: true, 
            message: `Email ${user.email} not verified. An email with a verification code has been sent to your email` 
        });
    }


    const { access_token, refresh_token } = await signToken(user);
    console.log('refresh_token :>> ', atob(refresh_token.split(".")[1]));
    const expiredCodeAt = dayjs().add(60, 's');

    // Send Access & Refresh Tokens in Cookie
    res.cookie("access_token", access_token, accessTokenCookieOptions);
    res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);
    res.cookie("logged_in", true, loginTokenCookieOptions); 

    res.json({ error: false, atoken: access_token, exp: expiredCodeAt });
};

export const registerHandler = async (req: Request, res: Response) => {
    const { agreedToTerms, email, username, password } = req.body;

    if (!agreedToTerms) {
        return res.json({ error: true, message: "You must agree to the terms and conditions to register." });
    }

    const existingUser = await getUserByEmailOrUsername(email, username);
    if (existingUser) {
        log.info(`${JSON.stringify({ action: "createUser existingUser", data: existingUser })}`);
        return res.json({ error: true, message: "User with the provided email or username already exists" });
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
    const code = createVerificationCode();

    // put code and expiredCodeAt in user_registration 
    user_registration["otpCode"] = code;
    // user_registration["expiredCodeAt"] = dayjs().add(60, 's');

    // put user in redis
    const addedToRedis = await redisCLI.setnx(`verify_email_pending_${email}`, JSON.stringify(user_registration));
    if (!addedToRedis) {
        return res.json({ error: true, message: "Email already registered." });
    }

    await redisCLI.expire(`verify_email_pending_${email}`, 300); // 5 min

    // send otp code in user email
    const { firstName, lastName } = user_registration;
    let subject = "OTP Verification Email";
    let templatePath= "OTP";
    const templateData = {
        title: subject,
        name: `${firstName} ${lastName}`,
        code
    };
    
    const mailSent = await sendEmail(templatePath, templateData);
    if (!mailSent) {
        return res.json({ error: true, message: "There was an error sending email, please try again" });
    }
        
    return res.json({ 
        error: false, 
        message: "An email with a verification code has been sent to your email. Please enter this code to proceed" 
    });
};

export const verifyEmailHandler = async (req: Request, res: Response) => {
    const { code, email } = req.body;
    
    let redisObj: any = await redisCLI.get(`verify_email_pending_${email}`);
    redisObj = JSON.parse(redisObj);
    if (!redisObj) {
        return res.json({ error: true, message: "Confirmation time expired!" });
    }

    const { otpCode, expiredCodeAt } = redisObj;

    if (code !== otpCode) {
        return res.json({ error: true, message: "Confirmation code incorrect!" });
    }

    // check if otp code is expired
    // const currentDateTime = dayjs();
    // const expiresAtDateTime = dayjs(expiredCodeAt);
    // const isExpired = currentDateTime.isAfter(expiresAtDateTime);
    // if (isExpired) {
    //     log.error(`${JSON.stringify({ action: "expired User", data: redisObj })}`);
    //     res.json({ error: true, message: "Your OTP code has expired. Please request a new OTP code" });
    // } // nuk duhet

    const existingUser = await getUserByEmail(email);
    let user;
    let verified = true;

    if (existingUser) {
        user = await getAndUpdateUser(existingUser.id, { verified });
        if (!user) {
            log.error(JSON.stringify({ action: "Confirm updateUser Req", data: user }))
            return res.json({ error: true, message: "Failed to update user!" });
        }
    } else {
        user = await createUser(redisObj, verified);
        if (!user) {
            log.error(JSON.stringify({ action: "Confirm createUser Req", data: user }))
            return res.json({ error: true, message: "Failed to register user!" });
        }
    }

    await redisCLI.del(`verify_email_pending_${email}`);

    return res.json({
        error: false,
        message: "Congratulation! Your account has been created."
    });
};

export const logoutHandler = async (req: Request, res: Response) => {
    // const { user } = res.locals;
    // console.log('user :>> ', user);
    // if (!user) {
    //    return res.json({ error: true, message: "test" }); 
    // }

    // await redisCLI.del(`session_${user.id}`);

    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });
    res.cookie("logged_in", "", { maxAge: 1 });
    
    return res.json({ error: false, message: "Logout success" });
};

export const refreshAccessTokenHandler = async (req: Request, res: Response) => {
    const refresh_token = req.cookies.refresh_token as string;
};

export const forgotPasswordHandler = async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
        return res.json({ error: true, message: `This email: '${email}' is not register with us. Please enter a valid email.` });
    }

    if (!user.verified) {
        return res.json({ error: true, message: "User not verified" });
    }

    const code = createVerificationCode();

    const user_reset = {
        ...user,
        conf_code: code,
    };

    const addedToRedis = await redisCLI.setnx(`reset_password_pending_${user.email}`, JSON.stringify(user_reset));
    if (!addedToRedis) {
      return res.json({ error: true, message: "New password waiting for confirmation. Please check your inbox!" });
    }
    await redisCLI.expire(`reset_password_pending_${user.email}`, 300); // 5 min

    let templatePath= "ForgotPassword";
    const templateData = {
        title: "Reset Password",
        // urlTitle: "Reset Password",
        code,
        name: user.email
    };

    const mailSent = await sendEmail(templatePath, templateData);
    if (!mailSent) {
        return res.json({ error: true, message: "There was an error sending email, please try again" });
    }
        
    return res.json({ error: false, message: "Email Sent Successfully, Please Check Your Email to Continue Further." });
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
    const { password, email, code } = req.body;

    let redisObj: any = await redisCLI.get(`reset_password_pending_${email}`);
    redisObj = JSON.parse(redisObj);
    if (!redisObj) {
        return res.json({ error: true, message: "Your token has expired. Please attempt to reset your password again." });
    }

    const { id, conf_code, username } = redisObj; 
    const parseExtra = JSON.parse(redisObj.extra);
    const { firstName, lastName } = parseExtra;

    if (code !== conf_code) {
        return res.json({ error: true, message: "Confirmation code incorrect!" });
    }

    const hash = crypto
        .createHash("sha1")
        .update(password + username)
        .digest("hex");

    const newPassword = await getAndUpdateUser(+id, { password: hash });
    if (!newPassword) {
        return res.json({ error: true, message: "Some Error in Updating the Password" });
    }

    await redisCLI.del(`reset_password_pending_${email}`);

    let templatePath= "UpdatePassword";
    const templateData = {
        title: "Password Update Confirmation",
        // urlTitle: "Login",
        name: `${firstName} ${lastName}`,
        email,
    };

    const mailSent = await sendEmail(templatePath, templateData);
    if (!mailSent) {
        return res.json({ error: true, message: "Somenthing went wrong. Email not sent." });
    }

    return res.json({ error: false, message: "Password data successfully updated, please login with your new credentials" });
};

export const googleOauthHandler = async (req: Request, res: Response) => {
    const user = req.user;
    const { access_token } = await signToken(user);
    // const jwToken = `Bearer ${access_token}`

    return res.redirect(`${client_url}/social-auth?token=${access_token}`);
};
