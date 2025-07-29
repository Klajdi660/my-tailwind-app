import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import config from "config";
import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
import { redisCLI } from "../clients";
import {
  getUserByEmail,
  getUserByEmailOrUsername,
  createUser,
  createVerificationCode,
  getAndUpdateUser,
  getUserById,
} from "../services/user.service";
import {
  signToken,
  log,
  sendEmail,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
  loginTokenCookieOptions,
  verifyJWT,
  signJWT,
} from "../utils";
import { AppParams, UserParams, JWTParams } from "../types";
import { EMAIL_PROVIDER } from "../constants";

const { access_token_expires } = config.get<JWTParams>("token");

const { client_url } = config.get<AppParams>("app");

export const loginHandler = async (req: Request, res: Response) => {
  const { identifier, password, remember } = req.body;

  const user = await getUserByEmailOrUsername(identifier, identifier);
  if (!user) {
    return res.json({
      error: true,
      message: "User is not Registered with us, please Sign Up to continue.",
    });
  }

  if (user && user.provider !== EMAIL_PROVIDER.Email) {
    return res.json({
      error: true,
      message: `That email address is already in use using ${user.provider} provider.`,
    });
  }

  const expectedHash = crypto
    .createHash("sha1")
    .update(password + user.username)
    .digest("hex");
  if (user.password !== expectedHash) {
    return res.json({
      error: true,
      message: "Invalid Password! Please enter valid password.",
    });
  }

  if (!user.verified) {
    const code = createVerificationCode();

    const user_registration = {
      otpCode: code,
      expiredCodeAt: dayjs().add(60, "s"),
    };

    // const addedToRedis = await redisCLI.setnx(
    //   `verify_email_pending_${user.email}`,
    //   JSON.stringify(user_registration)
    // );
    const addedToRedis = await redisCLI.set(
      `verify_email_pending_${user.email}`,
      JSON.stringify(user_registration)
    );
    if (!addedToRedis) {
      return res.json({ error: true, message: "Email already registered." });
    }

    await redisCLI.expire(`register_pending_${user.email}`, 3600);

    const extra = JSON.parse(user.extra);
    let subject = "OTP Verification Email";
    let templatePath = "OTP";
    const templateData = {
      title: subject,
      name: `${extra.firstName} ${extra.lastName}`,
      code,
    };

    const mailSent = await sendEmail(templatePath, templateData);
    if (!mailSent) {
      return res.json({
        error: true,
        message: "There was an error sending email, please try again",
      });
    }

    return res.json({
      error: true,
      message: `Email ${user.email} not verified. An email with a verification code has been sent to your email`,
    });
  }

  const { access_token, refresh_token } = await signToken(user);

  res.cookie("access_token", access_token, accessTokenCookieOptions);
  res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);
  res.cookie("logged_in", true, loginTokenCookieOptions);

  res.json({
    error: false,
    message: "Login successful",
    data: { atoken: access_token, rtoken: refresh_token },
  });
};

export const registerHandler = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const existingUser = await getUserByEmailOrUsername(email, username);
  if (existingUser) {
    log.info(
      `${JSON.stringify({
        action: "createUser existingUser",
        data: existingUser,
      })}`
    );
    return res.json({
      error: true,
      message: "User with the provided email or username already exists",
    });
  }

  const hash = crypto
    .createHash("sha1")
    .update(password + username)
    .digest("hex");

  const user_registration: UserParams = {
    ...req.body,
    password: hash,
    // passwordConfirm: hash,
  };

  const code = createVerificationCode();
  const codeExpire = dayjs().add(180, "s");

  user_registration["otpCode"] = code;
  user_registration["expiredCodeAt"] = codeExpire;

  // const addedToRedis = await redisCLI.setnx(
  //   `verify_email_pending_${email}`,
  //   JSON.stringify(user_registration)
  // );
  const addedToRedis = await redisCLI.set(
    `verify_email_pending_${email}`,
    JSON.stringify(user_registration)
  );

  if (!addedToRedis) {
    return res.json({ error: true, message: "Email already registered." });
  }

  await redisCLI.expire(`verify_email_pending_${email}`, 180); // 3 min

  const { fullName } = user_registration;
  const subject = "OTP Verification Email";
  const templatePath = "OTP";
  const templateData = {
    title: subject,
    name: fullName,
    code,
  };

  const mailSent = await sendEmail(templatePath, templateData);
  if (!mailSent) {
    return res.json({
      error: true,
      message: "There was an error sending email, please try again",
    });
  }

  res.json({
    error: false,
    message:
      "An email with a verification code has been sent to your email. Please enter this code to proceed",
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

  const currentDateTime = dayjs();
  const expiresAtDateTime = dayjs(expiredCodeAt);
  const isExpired = currentDateTime.isAfter(expiresAtDateTime);

  if (isExpired) {
    log.error(`${JSON.stringify({ action: "expired User", data: redisObj })}`);
    return res.json({
      error: true,
      message: "Your OTP code has expired. Please request a new OTP code",
    });
  } // nuk duhet

  const existingUser = await getUserByEmail(email);
  let user;
  let verified = true;

  if (existingUser) {
    user = await getAndUpdateUser(existingUser.id, { verified });
    if (!user) {
      log.error(
        JSON.stringify({ action: "Confirm updateUser Req", data: user })
      );
      return res.json({ error: true, message: "Failed to update user!" });
    }
  } else {
    user = await createUser(redisObj, verified);
    if (!user) {
      log.error(
        JSON.stringify({ action: "Confirm createUser Req", data: user })
      );
      return res.json({ error: true, message: "Failed to register user!" });
    }
  }

  await redisCLI.del(`verify_email_pending_${email}`);

  res.json({
    error: false,
    message: "Congratulation! Your account has been created.",
    data: { code: otpCode, codeExpire: expiredCodeAt },
  });
};

export const logoutHandler = async (req: Request, res: Response) => {
  // const { user } = res.locals;
  // if (!user) {
  //    return res.json({ error: true, message: "test" });
  // }

  // await redisCLI.del(`session_${user.id}`);

  res.cookie("access_token", "", { maxAge: 1 });
  res.cookie("refresh_token", "", { maxAge: 1 });
  res.cookie("logged_in", "", { maxAge: 1 });

  res.json({ error: false, message: "Logout success" });
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refresh_token = req.cookies.refresh_token as string;

  const msg = "Could not refresh access token";

  // Validate the Refresh token
  const decoded = verifyJWT<{ id: string }>(
    refresh_token,
    "refreshTokenPublicKey"
    // "refreshTokenPrivateKey"
  );
  if (!decoded) {
    return next({ error: true, message: msg });
  }

  // Check if the user has a valid session
  const session = await redisCLI.get(`session_${decoded.id}`);
  if (!session) {
    return next({ error: true, message: msg });
  }

  // Check if the user exist
  const user = await getUserById(JSON.parse(session).id);
  if (!user) {
    return next({ error: true, message: msg });
  }

  // Sign new access token
  const atoken = signJWT({ id: user.id }, "accessTokenPrivateKey", {
    expiresIn: access_token_expires,
  });

  // Send the access token as cookie
  res.cookie("atoken", atoken, accessTokenCookieOptions);
  res.cookie("logged_in", true, {
    ...accessTokenCookieOptions,
    httpOnly: false,
  });

  res.json({ error: true, data: { atoken } });
};

export const forgotPasswordHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await getUserByEmail(email);
  if (!user) {
    return res.json({
      error: true,
      message: `This email: '${email}' is not register with us. Please enter a valid email.`,
    });
  }

  if (!user.verified) {
    return res.json({ error: true, message: "User not verified" });
  }

  const code = createVerificationCode();

  const user_reset = {
    ...user,
    conf_code: code,
  };

  // const addedToRedis = await redisCLI.setnx(
  //   `reset_password_pending_${user.email}`,
  //   JSON.stringify(user_reset)
  // );
  const addedToRedis = await redisCLI.set(
    `reset_password_pending_${user.email}`,
    JSON.stringify(user_reset)
  );
  if (!addedToRedis) {
    return res.json({
      error: true,
      message:
        "New password waiting for confirmation. Please check your inbox!",
    });
  }
  await redisCLI.expire(`reset_password_pending_${user.email}`, 300); // 5 min

  let templatePath = "ForgotPassword";
  const templateData = {
    title: "Reset Password",
    // urlTitle: "Reset Password",
    code,
    name: user.email,
  };

  const mailSent = await sendEmail(templatePath, templateData);
  if (!mailSent) {
    return res.json({
      error: true,
      message: "There was an error sending email, please try again",
    });
  }

  res.json({
    error: false,
    message:
      "Email Sent Successfully, Please Check Your Email to Continue Further.",
  });
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
  const { password, email, code } = req.body;

  let redisObj: any = await redisCLI.get(`reset_password_pending_${email}`);
  redisObj = JSON.parse(redisObj);
  if (!redisObj) {
    return res.json({
      error: true,
      message:
        "Your token has expired. Please attempt to reset your password again.",
    });
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
    return res.json({
      error: true,
      message: "Some Error in Updating the Password",
    });
  }

  await redisCLI.del(`reset_password_pending_${email}`);

  let templatePath = "UpdatePassword";
  const templateData = {
    title: "Password Update Confirmation",
    // urlTitle: "Login",
    name: `${firstName} ${lastName}`,
    email,
  };

  const mailSent = await sendEmail(templatePath, templateData);
  if (!mailSent) {
    return res.json({
      error: true,
      message: "Somenthing went wrong. Email not sent.",
    });
  }

  res.json({
    error: false,
    message:
      "Password data successfully updated, please login with your new credentials",
  });
};

export const googleOauthHandler = async (req: Request, res: Response) => {
  const user = req.user;
  const { access_token } = await signToken(user);
  // const jwToken = `Bearer ${access_token}`

  res.redirect(`${client_url}/social-auth?token=${access_token}`);
};
