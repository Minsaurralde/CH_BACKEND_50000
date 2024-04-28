import { Router } from "express";
import { generateRandomProducts } from "../utils/product-mock.util.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = generateRandomProducts(100);
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
