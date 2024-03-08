import { Request, Response, NextFunction } from "express";
import { redisCLI } from "../clients";
import { verifyJWT, log } from "../utils";
import { getUserById } from "../services/user.service";

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { authorization } = req.headers;
        const { access_token } = req.cookies;

        // Get the token
        let accessToken;
        if (authorization && authorization.startsWith("Bearer")) {
            accessToken = authorization.split(" ")[1];
        } else if (access_token) {
            accessToken = access_token
        }

        if (!accessToken) {
            return next({ error: true, message: "You are not logged in" });
        }

        // Validate Access Token
        const decoded: any = verifyJWT(accessToken, "accessTokenPrivateKey");

        // const decoded: any = verifyJWT(accessToken, "accessTokenPublicKey");
        if (!decoded) {
            console.log("HYRIII")
            return next({ error: true, message: "Invalid token or user doesn't exist" });
        }
    
        // Check if user has a valid session
        const session = await redisCLI.get(`session_${decoded.id}`);
        if (!session) {
            return next({ error: true, message: "User session has expired" });
        }

        // Check if user still exist
        const user = await getUserById(JSON.parse(session).id);
        if (!user) {
            return next({ error: true, messahe: "User with that token no longer exist" });
        }
      
        res.locals.user = user;

        next();
    } catch (e: any) {
        log.error(`${JSON.stringify({ action: "authenticate catch", message: e.message })}`);
        next(e);
    }
};
