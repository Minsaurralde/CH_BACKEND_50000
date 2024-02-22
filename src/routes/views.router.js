import { Router } from "express";

import ProductManager from "../daos/mongo/class/ProductManager.js";
import passport from "passport";

const router = Router();

// rutas privadas
router.get(
  "/",
  passport.authenticate(["github", "jwt"], { session: false }),
  async (req, res) => {
    console.log(req);
    if (!req.user) return res.redirect("/login");

    console.log("USER: ", req.user);

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
      user: req.user,
    });
  }
);

router.get(
  "/realtimeproducts",
  passport.authenticate(["jwt", "github"], { session: false }),
  async (req, res) => {
    if (!req.user) return res.redirect("/login");
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
  }
);

router.get(
  "/profile",
  passport.authenticate(["jwt", "github"], { session: false }),
  async (req, res) => {
    if (!req.user) return res.redirect("/login"); //------> ver session
    res.render("profile", { user: req.user });
  }
);

// rutas publicas
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
