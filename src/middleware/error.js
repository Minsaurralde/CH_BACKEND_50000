import { EErrorCode } from "../handlers/errors/enum-errors.js";

export const errorMidleware = (error, req, res, next) => {
  console.log("cause: ", error.cause);
  switch (error.code) {
    case EErrorCode.BAD_REQUEST:
      res.status(400).json({ status: "error", error: error.name });
      break;

    default:
      res.status(500).json({ status: "error", error: "Internal Server Error" });
      break;
  }
};
