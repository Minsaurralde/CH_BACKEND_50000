import getLogger from "../winston/factory.js";

export const logger = (req, res, next) => {
  req.logger = getLogger;

  next();
};
