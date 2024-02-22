import passport from "passport";
import jwt from "passport-jwt";
import { cookieExtractor } from "../utils/cookieExtractor.js";
import { JWT_SECRET } from "../constants/environments.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

export const initializePassportJWT = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_SECRET,
      },
      async (jwtPayload, done) => {
        console.log("jwt Payload: ", jwtPayload);
        try {
          return done(null, jwtPayload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
