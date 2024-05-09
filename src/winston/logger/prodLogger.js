import winston from "winston";
import customLevelsOptions from "../config/custom.winston.js";

// el logger de prod debe loguear desde nivel info
// tranporte de archivos a partir del nivel error con el nombre errors.log
const prodLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: "./errors.log", level: "error" }),
  ],
});

export default prodLogger;
