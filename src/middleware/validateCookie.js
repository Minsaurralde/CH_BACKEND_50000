import { JWT_COOKIE } from "../config/app.config.js";

export const validateCookie = (req, res, next) => {
  const cookie = req.cookies[JWT_COOKIE];
  if (!cookie) return res.redirect("/login");

  next();
};
