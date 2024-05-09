import { ENVIRONMENT } from "../app.config.js";
import devLogger from "./logger/devLogger.js";
import prodLogger from "./logger/prodLogger.js";

let getLogger;

switch (ENVIRONMENT) {
  case "dev":
    getLogger = devLogger;
    break;
  case "prod":
    getLogger = prodLogger;
    break;
}

export default getLogger;
