import viewsController from "../controllers/views.controller.js";
import cartsController from "../controllers/carts.controller.js";
import productsController from "../controllers/products.controller.js";
import sessionsController from "../controllers/sessions.controller.js";

export const router = (app) => {
  //RUTAS DISPONIBLES
  app.use("/", viewsController);
  app.use("/api/carts/", cartsController);
  app.use("/api/products/", productsController);
  app.use("/api/sessions/", sessionsController);
};
