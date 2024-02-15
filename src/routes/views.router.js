import { Router } from "express";

import ProductManager from "../daos/mongo/class/ProductManager.js";

const router = Router();

router.get("/", async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  const limit = req.query.limit && Number(req.query.limit);
  const page = req.query.page && Number(req.query.page);
  const sort = req.query.sort && Number(req.query.sort);
  const { filter, filterVal } = req.query;

  //creo instancia de la clase
  const instancia1 = new ProductManager();
  //obtengo los datos
  const data = await instancia1.getProducts(
    limit,
    page,
    sort,
    filter,
    filterVal
  );
  const hasData = !!data.payload.length;

  res.render("home", {
    hasProduct: hasData,
    showDelete: false,
    product: data,
    user: req.session.user,
  });
});

router.get("/realtimeproducts", async (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  //creo instancia de la clase
  const instancia1 = new ProductManager();
  //obtengo los datos
  const data = await instancia1.getProducts();
  const hasData = !!data.payload.length;

  res.render("realTimeProducts", {
    hasProduct: hasData,
    showDelete: true,
    product: data,
  });
});

router.get("/chat", async (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  res.render("chat", { data: false });
});

router.get("/profile", async (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  res.render("profile", { user: req.session.user });
});

router.get("/login", async (req, res) => {
  res.render("authlogin");
});

router.get("/register", async (req, res) => {
  res.render("authregister");
});

router.get("/resetpassword", async (req, res) => {
  res.render("authresetpass");
});

export default router;
