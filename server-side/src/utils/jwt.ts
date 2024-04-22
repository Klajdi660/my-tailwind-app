import config from "config";
import jwt, { SignOptions } from "jsonwebtoken";
import { redisCLI } from "../clients";
import { log } from "./logger";
import { JWTParams } from "../types";
import dayjs from "dayjs";

const { access_token_expires, refresh_token_expires } =
  config.get<JWTParams>("token");

export const signJWT = (
  payload: object,
  key: string,
  // key: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options: SignOptions = {}
) => {
  const privateKey = Buffer.from(config.get<string>(key), "base64").toString(
    "ascii"
  );

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "HS256",
    // algorithm: "RS256",
  });
};

export const signToken = async (user: any) => {
  // Sign the access token
  // const access_token = signJWT({ id: user.id }, "accessTokenPrivateKey", {
  //     expiresIn: `${access_token_expires}m`,
  // });
  // const aTokenExpire = dayjs().add(access_token_expires, "m");
  const access_token = signJWT({ id: user.id }, "accessTokenPrivateKey", {
    expiresIn: `${access_token_expires}m`,
    // expiresIn: aTokenExpire,
  });

  // Sign the refresh token
  const refresh_token = signJWT({ id: user.id }, "refreshTokenPrivateKey", {
    expiresIn: `${refresh_token_expires}m`,
  });

  // Create a Session
  await redisCLI.setnx(`session_${user.id}`, JSON.stringify(user));
  await redisCLI.expire(`session_${user.id}`, 3600);

  return { access_token, refresh_token };
};

export const verifyJWT = <T>(
  token: string,
  key: string
  // key: "accessTokenPublicKey" | "refreshTokenPublicKey"
): T | null => {
  try {
    const publicKey = Buffer.from(config.get<string>(key), "base64").toString(
      "ascii"
    );

    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (error) {
    log.error(`${JSON.stringify({ action: "verifyJWT catch", data: error })}`);
    return null;
  }
};
