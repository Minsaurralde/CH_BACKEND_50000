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

import ProductService from "./services/product.service.js";
import { router } from "./router/index.js";
import mongoUri from "./store/mongo/config/index.js";
import __dirname from "./constants/dirnames.js";

const app = express();

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

const httpServer = app.listen(8080, () =>
  console.log("server ready on port 8080")
);

const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
  console.log("New conection id: " + socket.id);

  socket.on("new-product", async (newProduct) => {
    try {
      const res = await ProductService.newProduct(newProduct);

      //si todo sale bien envio el update al cliente
      socket.emit("update", res);
    } catch (error) {
      //si hay un error envio el detalle del error
      socket.emit("error", error.message);
    }
  });
});

//CAPA DE RUTEO
router(app);
