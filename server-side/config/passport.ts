import config from "config";
import passport from "passport";
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from "../src/models/Users";
import { EMAIL_PROVIDER } from "../src/constants";
// import { GoogleAuthParams } from "../src/types";

const { client_id, client_secret, callback_url } = config.get<any>("google");

// const secret = "Klajdi96@";
// let opts = {} as any;
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = secret;

// passport.use(
//   new JwtStrategy(opts, async (payload, done) => {
//     try {
//       const user = await User.findByPk(payload.id);
//       if (user) {
//         return done(null, user);
//       }

//       return done(null, false);
//     } catch (err) {
//       return done(err, false);
//     }
//   })
// );

const googleAuth = async () => {
  try {
    passport.use(
      new GoogleStrategy(
        {
          clientID: client_id,
          clientSecret: client_secret,
          callbackURL: callback_url,
        },
        async (accessToken, refreshToken, profile: any, done) => {
          const extraData = {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
          };
          const username = profile.displayName.split(' ').join('').toLowerCase();

          const newUser = {
            googleId: profile.id,
            username,
            hash: "",
            extra: JSON.stringify(extraData),
            avatar: profile.photos[0].value,
            email: profile.emails[0].value,
            provider: EMAIL_PROVIDER.Google,
          };

          try {
            let user = await User.findOne({
              where: { googleId: profile.id }
            });
  
            if (user) {
              done(null, user);
            } else {
              user = await User.create(newUser);
              done(null, user);
            }
          } catch (err) {
            console.error(err);
          }
        }
      )
    );
    
    // // used to serialize the user for the session
    // passport.serializeUser((user: any, done: any) => {
    //   done(null, user.id);
    // });

    // // used to deserialize the user
    // passport.deserializeUser(async (id: any, done: any) => {
    //   try {
    //     const user = await User.findByPk(id);
    //     done(null, user);
    //   } catch (err) {
    //     done(err, null);
    //   }
    // });
  } catch (e) {
    console.log(JSON.stringify({ action: "googleAuthCatch", message: "Missing google keys!", data: e }));
  }
};

const linkedinAuth = async () => {
  try {

  } catch (e) {
    console.log(JSON.stringify({ action: "linkedinAuthCatch", message: "Missing facebook keys!", data: e }));
  }
};

const facebookAuth = async () => {
  try {} catch (e) {
    console.log(JSON.stringify({ action: "facebookAuthCatch", message: "Missing facebook keys!", data: e }));
  }
};

export default async (app: any) => {
  app.use(passport.initialize());
  await googleAuth();
  await linkedinAuth();
  await facebookAuth();
};