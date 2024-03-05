require("dotenv").config();
import express, { Express, Request, Response, NextFunction } from "express";
import config from "config";
import passport from "passport";
// import session from 'express-session';
// import SequelizeStore from "connect-session-sequelize";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import { sequelizeConnection } from "./clients";
import { log } from "./utils";
import routes from "./routes";
import passportConfig from "../config/passport";
import { cloudinaryConnect } from "../config/cloudinary";
import { AppParams } from "./types";

const { port, client_url } = config.get<AppParams>("app");

const app: Express = express();

// Initialize SequelizeStore for session storage
// const SequelizeSessionStore = SequelizeStore(session.Store);
// const sessionStore = new SequelizeSessionStore({
//     db: sequelizeConnection,
//     expiration: 24 * 60 * 60 * 1000, 
// });

app.use(express.json({ limit: "10kb" })); 
app.use(express.urlencoded({ extended: true })); 

app.use(
    helmet({
        contentSecurityPolicy: false,
        frameguard: true,
    })
);

app.use(cookieParser());

const corsOptions = {
    origin: client_url,
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));
app.options("*", cors());

// less hackers know about our stack
app.disable("x-powered-by");

// app.use(
//     session({
//         secret: "keyboard cat",
//         resave: false,
//         saveUninitialized: false,
//         store: sessionStore,
//     })
// );

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();

app.get(
    "/api/healthChecker",
    (req: Request, res: Response, next: NextFunction) => {
      res.json({
        error: false,
        message: "Welcome to GrooveIT😂😂👈👈",
      });
    }
);

app.use(routes);

// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});
  
// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;
  
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
});

// passport config
passportConfig(passport);

// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

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

