import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import { Server } from "socket.io";

import viewsRouter from "./routes/views.router.js";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import sessionsRouter from "./routes/sessions.router.js";

import ProductManager from "./daos/mongo/class/ProductManager.js";
import mongoUri from "./daos/mongo/constants/mongourl.js";
import __dirname from "./constants/dirnames.js";
import { intializePassport } from "./config/passport.config.js";
import passport from "passport";

const app = express();

//MEMO: "urlencoded" y "json" middlewate de express necesario para obtener información de los query parameters y leer req json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Indicamos que el public es estatico. En la ruta raiz se mostrara el index.html
app.use(express.static(`${__dirname}/public`));

//MEMO: handlebars es un motor de plantillas que simula un front basico
app.engine("handlebars", handlebars.engine()); // 1 - inicializar
app.set("views", `${__dirname}/src/views`); // 2 - setear la ruta de las vistas
app.set("view engine", "handlebars"); // 3 - setear para que el server renderice con handlebars

intializePassport();
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
      const instancia1 = new ProductManager();
      const res = await instancia1.addProduct(newProduct);

      //si todo sale bien envio el update al cliente
      socket.emit("update", res);
    } catch (error) {
      //si hay un error envio el detalle del error
      socket.emit("error", error.message);
    }
  });
});

//RUTAS DISPONIBLES
app.use("/", viewsRouter);
app.use("/api/carts/", cartsRouter);
app.use("/api/products/", productsRouter);
app.use("/api/sessions/", sessionsRouter);
