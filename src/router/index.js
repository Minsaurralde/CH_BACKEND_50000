import viewsController from "../controllers/views.controller.js";
import cartsController from "../controllers/carts.controller.js";
import productsController from "../controllers/products.controller.js";
import sessionsController from "../controllers/sessions.controller.js";
import mockingController from "../controllers/mockingproducts.controller.js";
import loggerController from "../controllers/logger.controller.js";
import usersController from "../controllers/users.controller.js";

export const router = (app) => {
  //RUTAS DISPONIBLES
  app.use("/", viewsController);
  app.use("/api/users/", usersController);
  app.use("/api/carts/", cartsController);
  app.use("/api/products/", productsController);
  app.use("/api/sessions/", sessionsController);
  app.use("/api/mockingproducts/", mockingController);
  app.use("/api/loggerTest/", loggerController);
};
