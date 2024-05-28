import passport from "passport";
import local from "passport-local";
import { userModel } from "../../store/mongo/models/user.model.js";
import { createHash, isValidPassword } from "../../utils/bcrypt.js";

const LocalStrategy = local.Strategy;

export const initializePassportLocal = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, age, email } = req.body;

        try {
          let user = await userModel.findOne({ email: username });
          if (user) {
            // console.log("user already exist");
            return done(null, false);
          }

          const newUser = {
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
          };

          const result = await userModel.create(newUser);

          return done(null, result);
        } catch (error) {
          return done("unhandled error:", error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });

          if (!user) {
            return done(null, false);
          }

          if (!isValidPassword(user, password)) {
            return done("invalid password", null);
          }
          user.last_login = Date.now();
          await user.save();

          return done(null, user);
        } catch (error) {}
      }
    )
  );
};
