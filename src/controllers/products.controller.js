import { Router } from "express";
import { validateProduct } from "../middleware/validateProduct.js";
import ProductService from "../services/product.service.js";
import { authorization } from "../middleware/authorization.js";

const router = Router();

router.get("/", async (req, res) => {
  const limit = req.query.limit && Number(req.query.limit);
  const page = req.query.page && Number(req.query.page);
  const { filter, filterVal, sort } = req.query;

  const data = await ProductService.getAll({
    limit,
    page,
    sort,
    filter,
    filterVal,
  });

  res.status(200).send(data);
});

router.get("/:pid", async (req, res) => {
  const prodId = req.params.pid;

  try {
    const data = await ProductService.getById(prodId);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/", authorization("admin"), validateProduct, async (req, res) => {
  const newProduct = req.body;

  try {
    await ProductService.newProduct(newProduct);
    res.status(200).send({ exito: "fue agregado con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put(
  "/:pid",
  authorization("admin"),
  validateProduct,
  async (req, res) => {
    const prodId = req.params.pid;
    const newProduct = req.body;

    try {
      await ProductService.updateById(prodId, newProduct);
      res.status(200).send({ exito: "se actualizo con exito" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

router.delete("/:pid", authorization("admin"), async (req, res) => {
  const prodId = Number(req.params.pid);

  try {
    await ProductService.deleteById(prodId);
    res.status(200).send({ exito: "fue borrado con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
