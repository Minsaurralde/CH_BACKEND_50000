import { Router } from "express";
import { validateProduct } from "../middleware/validateProduct.js";
import ProductService from "../services/product.service.js";
import { authorization } from "../middleware/authorization.js";

const router = Router();

// Debe leer el archivo de productos y devolverlos dentro de un objeto. query param = limit determina el maximo de obj en la resp.
router.get("/", async (req, res) => {
  const limit = req.query.limit && Number(req.query.limit);
  const page = req.query.page && Number(req.query.page);
  const { filter, filterVal, sort } = req.query;
  console.log("sort get: ", sort);

  //obtengo los datos
  const data = await ProductService.getAll(
    limit,
    page,
    sort,
    filter,
    filterVal
  );

  res.status(200).send(data);
});

// Debe devolver el objeto que coincida con el id que llega por params.
router.get("/:pid", async (req, res) => {
  const prodId = req.params.pid;

  //obtengo los datos
  try {
    const data = await ProductService.getById(prodId);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Debe agregar un nuevo prod con un id autogenerado (solo admin)
router.post("/", authorization("admin"), validateProduct, async (req, res) => {
  const newProduct = req.body;

  //inserto los datos
  try {
    await ProductService.newProduct(newProduct);
    res.status(200).send({ exito: "fue agregado con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Debe tomar un producto y actualizarlo por los campos enviados desde body. No debe afectar al ID! (solo admin)
router.put(
  "/:pid",
  authorization("admin"),
  validateProduct,
  async (req, res) => {
    const prodId = req.params.pid;
    const newProduct = req.body;

    //actualizo los datos
    try {
      await ProductService.updateById(prodId, newProduct);
      res.status(200).send({ exito: "se actualizo con exito" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

// Debe eliminar el producto con el pid indicado (solo admin)
router.delete("/:pid", authorization("admin"), async (req, res) => {
  const prodId = Number(req.params.pid);

  //solicito el borrado
  try {
    await ProductService.deleteById(prodId);
    res.status(200).send({ exito: "fue borrado con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
