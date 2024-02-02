require("dotenv").config();
import express, { Express, Request, Response, NextFunction } from "express";
import config from "config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { sequelizeConnection } from "./clients";
import { log } from "./utils";
import routes from "./routes";
import { AppParams } from "./types";
import passport from "passport";
import session from 'express-session';
import SequelizeStore from "connect-session-sequelize";
import passportConfig from "../config/passport";

const { port, client_url } = config.get<AppParams>("app");

const app: Express = express();

// Initialize SequelizeStore for session storage
const SequelizeSessionStore = SequelizeStore(session.Store);
const sessionStore = new SequelizeSessionStore({
    db: sequelizeConnection,
    expiration: 24 * 60 * 60 * 1000, // Session expiration time in milliseconds (optional)
});

app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ extended: true })); 

app.use(cookieParser());

const corsOptions = {
    origin: client_url,
    credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors());

// less hackers know about our stack
app.disable("x-powered-by");

app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
    })
);

app.use(routes);

// Unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});

// Global Error Handler
const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(`[errorHandler]: ${JSON.stringify({ action: "errorHandler", data: error })}`);
    if (res?.headersSent) return next(error);
    res?.json({ error: true, message: "Internal error" });
};
app.use(errorHandler);

// passport config
passportConfig(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Start server only when we have valid connection
sequelizeConnection
    .authenticate()
    .then(() => {
        log.info(`${JSON.stringify({ action: "Database Run", message: "Database connection has been established successfully." })}`);

        app.listen(port, () => {
            log.info(`${JSON.stringify({ action: "Server Run", messsage: `Server is running at http://localhost:${port}` })}`);
        });
    }).catch((error) => {
        log.error(`${JSON.stringify({ action: "Server Catch", messsage: "Cannot connect to the server", data: error })}`);
    });

