import config from "config";
import jwt from "jsonwebtoken";
import { redisCLI } from "../clients";
import { log } from "./logger";
import { JWTParams } from "../types";

const { access_token_expires, refresh_token_expires } = config.get<JWTParams>("token");

const signJWT = (
    payload: object,
    key: string,
    options = {}
) => {
    const privateKey = Buffer.from(
        config.get<string>(key),
        "base64"
    ).toString("ascii");

    return jwt.sign(
        payload,
        privateKey,
        {
            ...(options && options),
            algorithm: "HS256",
            allowInsecureKeySizes: true,
        }
    );
};

// Sign Token
export const signToken = async (user: any) => {
    // Sign the access token
    const access_token = signJWT({ id: user.id }, "accessTokenPrivateKey", {
        expiresIn: `${access_token_expires}m`,
    });

    // Sign the refresh token
    const refresh_token = signJWT({ id: user.id }, "refreshTokenPrivateKey", {
        expiresIn: `${refresh_token_expires}m`
    });

    // Create a Session
    await redisCLI.setnx(`session_${user.id}`, JSON.stringify(user));
    await redisCLI.expire(`session_${user.id}`, 3600);
    
    return { access_token, refresh_token };
};

export const verifyJWT = (token: string, key: string) => {
    try {
        const publicKey = Buffer.from(
            config.get<string>(key), 
            "base64"
        ).toString("ascii");

        const decoded = jwt.verify(token, publicKey);
        return decoded;
    } catch (error) {
        log.error(`[verifyJWT]: ${JSON.stringify({ action: "verifyJWT catch", data: error })}`);
        return null;
    }
};
