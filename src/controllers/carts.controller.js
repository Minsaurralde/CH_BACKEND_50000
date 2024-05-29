import { Router } from "express";
import passport from "passport";
import ProductService from "../services/product.service.js";
import CartService from "../services/cart.service.js";
import { authorization } from "../middleware/authorization.js";
import { userModel } from "../store/mongo/models/user.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await CartService.getAll();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post(
  "/",
  passport.authenticate(["jwt"], { session: false }),
  async (req, res) => {
    const email = req.user.email;
    try {
      const user = await userModel.findOne({ email: email });
      if (user.cart) {
        res.status(200).send(user.cart._id);
      } else {
        const response = await CartService.newCart();
        user.cart = response;
        await user.save();
        res.status(200).send(response);
      }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
    const response = await CartService.getById(cartId);

    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const newProducts = req.body;

  try {
    await CartService.updateAllProducts(cartId, newProducts); // proceso el update
    res.status(200).send({ exito: "se actualizo con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete("/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
    await CartService.deleteAllProducts(cartId); // proceso el borrado
    res.status(200).send({ exito: "los productos se eliminaron con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post(
  "/:cid/purchase",
  passport.authenticate(["jwt"], { session: false }),
  authorization("user"),
  async (req, res) => {
    const cartId = req.params.cid;
    const email = req.user.email;

    try {
      const purchase = await CartService.purchaseCart(cartId, email);
      res.status(200).send(purchase);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

router.post(
  "/:cid/product/:pid",
  passport.authenticate(["jwt"], { session: false }),
  authorization("user"),
  async (req, res) => {
    const cartId = req.params.cid;
    const prodId = req.params.pid;

    try {
      await ProductService.getById(prodId); // 1 - valido prodId
      await CartService.addProduct(cartId, prodId, 1); // 2 - proceso el update
      res
        .status(200)
        .send({ exito: "el item se agrego con exito a tu carrito" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

router.put(
  "/:cid/product/:pid",
  passport.authenticate(["jwt"], { session: false }),
  authorization("user"),
  async (req, res) => {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    const qty = req.body.qty;

    try {
      await ProductService.getById(prodId); // 1 - valido que exista el prodId
      await CartService.addProduct(cartId, prodId, qty); // 2 - proceso el update
      res.status(200).send({ exito: "se actualizo con exito" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

router.delete("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const prodId = req.params.pid;

  try {
    await CartService.deleteProduct(cartId, prodId); // proceso el borrado
    res.status(200).send({ exito: "se elimino con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
