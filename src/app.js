import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import passport from "passport";
import { initializePassportJWT } from "./passport/config/jwt.passport.js";
import { initializePassportLocal } from "./passport/config/local.passport.js";
import { intializePassportGithub } from "./passport/config/github.passport.js";

import { router } from "./router/index.js";
import mongoUri from "./store/mongo/config/index.js";
import __dirname from "./utils/dirnames.js";
import { errorMidleware } from "./middleware/error.js";
import { logger } from "./middleware/logger.js";
import { configureWebSocket } from "./websocket/websocket.js";

const app = express();

// Midleware para loggear las request
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());

//MEMO: handlebars es un motor de plantillas que simula un front basico
app.engine("handlebars", handlebars.engine()); // 1 - inicializar
app.set("views", `${__dirname}/src/views`); // 2 - setear la ruta de las vistas
app.set("view engine", "handlebars"); // 3 - setear para que el server renderice con handlebars

// Configuraciones para passport
initializePassportLocal();
initializePassportJWT();
intializePassportGithub();
app.use(passport.initialize());

// Configuraciones del db
const DBconection = mongoose.connect(mongoUri);
app.use(
  session({
    store: new MongoStore({
      mongoUrl: mongoUri,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      // ttl: 15, // tiempo de expiracion de la sesion
    }),
    secret: "sessionSecret",
    resave: true,
    saveUninitialized: false,
  })
);

// Capa de ruteo
router(app);
// Midleware para handlear errores (despues del enrutador)
app.use(errorMidleware);

const httpServer = app.listen(8080, () =>
  console.log("server ready on port 8080")
);

// Configuraciones de websocket
const socketServer = new Server(httpServer);
configureWebSocket(socketServer);
