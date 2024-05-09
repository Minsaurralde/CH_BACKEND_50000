import winston from "winston";
import customLevelsOptions from "../config/custom.winston.js";

// el logger de dev debe loggear desde nivel debug (en consola)
const devLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    }),
  ],
});

export default devLogger;
