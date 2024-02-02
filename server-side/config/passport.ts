import config from "config";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from "../src/models/Users";

const { client_id, client_secret, callback_url } = config.get<any>("google");

export default function (passport: any) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: client_id,
        clientSecret: client_secret,
        callbackURL: callback_url,
      },
      async (accessToken, refreshToken, profile: any, done) => {
        console.log('profile :>> ', profile);
        // get the user data from google
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          email: profile.emails[0].value,
        };
        console.log('newUser :>> ', newUser);
        try {
            // find the user in our database
            let user = await User.findOne({
                where: { googleId: profile.id }
            });

            if (user) {
                // If user present in our database.
                done(null, user);
            } else {
                // if user is not present in our database save user data to the database.
                user = await User.create(newUser);
                done(null, user);
            }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  // used to serialize the user for the session
  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(async (id: any, done: any) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
