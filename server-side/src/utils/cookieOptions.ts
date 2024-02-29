import { CookieOptions } from "express";
import config from "config";
import dayjs from "dayjs";
import { JWTParams } from "../types";

const { access_token_expires, refresh_token_expires } = config.get<JWTParams>("token");

const accessTokenExpitesAt = dayjs().add(access_token_expires, "minute").toDate();
const refreshTokenExpitesAt = dayjs().add(refresh_token_expires, "minute").toDate();

export const accessTokenCookieOptions: CookieOptions = {
    expires: accessTokenExpitesAt,
    maxAge: access_token_expires * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
};

export const refreshTokenCookieOptions: CookieOptions = {
    expires: refreshTokenExpitesAt,
    maxAge: refresh_token_expires * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
};

export const loginTokenCookieOptions = {
    ...accessTokenCookieOptions,
    httpOnly: false,
};
