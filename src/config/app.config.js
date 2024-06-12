import dotenv from "dotenv";
// import { Command } from "commander";

// const program = new Command();
// program.option("-m, --mode <mode>", "Specifies the running mode", "dev");
// program.parse();
// const options = program.opts();
// const mode = options.mode;

dotenv.config({
  path: `./src/.env.prod`,
  // path: `./src/.env.${process.env.ENVIRONMENT}`,
  // path: `./src/.env.${mode}`,
});

export const ENVIRONMENT = process.env.ENVIRONMENT || "prod";

export const GITHUB_APP_ID = process.env.GITHUB_APP_ID;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
export const GITHUB_CALLBACK = process.env.GITHUB_CALLBACK;

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_COOKIE = process.env.JWT_COOKIE;

export const MONGO_CLUSTER = process.env.MONGO_CLUSTER;
export const MONGO_USER = process.env.MONGO_USER;
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

export const NODEMAILER_USER = process.env.NODEMAILER_USER;
export const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD;

export const PORT = process.env.PORT;
export const HOST = process.env.HOST;
