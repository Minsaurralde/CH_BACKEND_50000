import { Router } from "express";

import ProductManager from "../domain/class/ProductManager.js";

const router = Router();

router.get("/", async (req, res) => {
  //creo instancia de la clase
  const instancia1 = new ProductManager("productos.txt");
  //obtengo los datos
  const data = await instancia1.getProducts();
  const hasData = !!data.length;

  res.render("home", { hasProduct: hasData, product: data });
});

router.get("/realtimeproducts", async (req, res) => {
  //creo instancia de la clase
  const instancia1 = new ProductManager("productos.txt");
  //obtengo los datos
  const data = await instancia1.getProducts();
  const hasData = !!data.length;

  res.render("realTimeProducts", { hasProduct: hasData, product: data });
});

export default router;
