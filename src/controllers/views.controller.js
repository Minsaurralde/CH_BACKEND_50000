import { Router } from "express";
import passport from "passport";

import ProductService from "../services/product.service.js";
import { validateCookie } from "../middleware/validateCookie.js";

const router = Router();

// rutas privadas
router.get(
  "/",
  validateCookie,
  passport.authenticate(["jwt"], { session: false }),
  async (req, res) => {
    const limit = req.query.limit && Number(req.query.limit);
    const page = req.query.page && Number(req.query.page);
    const sort = req.query.sort && Number(req.query.sort);
    const { filter, filterVal } = req.query;

    //obtengo los datos
    const data = await ProductService.getAll(
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
  passport.authenticate(["jwt"], { session: false }),
  async (req, res) => {
    if (!req.user) return res.redirect("/login");

    //obtengo los datos
    const data = await ProductService.getAll();
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
  passport.authenticate(["jwt"], { session: false }),
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
