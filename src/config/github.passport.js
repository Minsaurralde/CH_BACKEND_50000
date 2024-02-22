import passport from "passport";
import GithubStrategy from "passport-github2";
import { userModel } from "../daos/mongo/models/user.model.js";
import {
  GITHUB_CALLBACK,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} from "../constants/environments.js";
import { createHash } from "../utils/bcrypt.js";

export const intializePassportGithub = () => {
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK,
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log("profile: ", profile);
        let user = await userModel.findOne({ email: profile.profileUrl });
        if (!user) {
          let newUser = {
            first_name: profile.username,
            last_name: "test lastname",
            email: profile.profileUrl,
            age: 25,
            password: createHash("1234"),
          };
          const result = await userModel.create(newUser);
          console.log("github result: ", result);
          done(null, result);
        } else {
          console.log("github result: ", user);
          done(null, user);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, false);
  });
};
