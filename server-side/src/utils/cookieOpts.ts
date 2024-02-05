import config from "config";
import dayjs from "dayjs";
import { JWTParams } from "../types";

const { access_token_expires, refresh_token_expires } = config.get<JWTParams>("token");

export const accessTokenCookieOptions = {
  expires: dayjs().add(access_token_expires, 'minutes').toDate(),
  maxAge: access_token_expires * 60 * 1000,
  httpOnly: true,
};

export const refreshTokenCookieOptions = {
  expires: dayjs().add(refresh_token_expires, 'minutes').toDate(),
  maxAge: refresh_token_expires * 60 * 1000,
  httpOnly: true,
};

export const loginTokenCookieOptions = {
  ...accessTokenCookieOptions,
  httpOnly: true
};