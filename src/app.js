import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

import ProductManager from "./domain/class/ProductManager.js";
import __dirname from "./domain/constants/dirnames.js";

const app = express();
//MEMO: "urlencoded" y "json" middlewate de express necesario para obtener información de los query parameters y leer req json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//MEMO: handlebars es un motor de plantillas que simula un front basico
app.engine("handlebars", handlebars.engine()); // 1 - inicializar
app.set("views", `${__dirname}/src/views`); // 2 - setear la ruta de las vistas
app.set("view engine", "handlebars"); // 3 - setear para que el server renderice con handlebars

// Indicamos que el public es estatico. En la ruta raiz se mostrara el index.html
app.use(express.static(`${__dirname}/public`));

//RUTAS DISPONIBLES
app.use("/", viewsRouter);
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);

const httpServer = app.listen(8080, () =>
  console.log("server ready on port 8080")
);

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("new-product", async (newProduct) => {
    try {
      const instancia1 = new ProductManager("productos.txt");
      const res = await instancia1.addProduct(newProduct);

      //si todo sale bien envio el update al cliente
      socket.emit("update", res);
    } catch (error) {
      //si hay un error envio el detalle del error
      socket.emit("error", error.message);
    }
  });
});
