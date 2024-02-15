import { Router } from "express";
import { validateProduct } from "../middleware/validateProduct.js";
import ProductManager from "../daos/mongo/class/ProductManager.js";

const router = Router();

// Debe leer el archivo de productos y devolverlos dentro de un objeto. query param = limit determina el maximo de obj en la resp.
router.get("/", async (req, res) => {
  const limit = req.query.limit && Number(req.query.limit);
  const page = req.query.page && Number(req.query.page);
  const { filter, filterVal, sort } = req.query;
  console.log("sort get: ", sort);

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

  res.status(200).send(data);
});

// Debe devolver el objeto que coincida con el id que llega por params.
router.get("/:pid", async (req, res) => {
  const prodId = req.params.pid;
  //creo instancia de la clase
  const instancia1 = new ProductManager();
  //obtengo los datos
  try {
    const data = await instancia1.getProductById(prodId);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Debe agregar un nuevo prod con un id autogenerado
router.post("/", validateProduct, async (req, res) => {
  const newProduct = req.body;
  //creo instancia de la clase
  const instancia1 = new ProductManager();
  //inserto los datos
  try {
    await instancia1.addProduct(newProduct);
    res.status(200).send({ exito: "fue agregado con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Debe tomar un producto y actualizarlo por los campos enviados desde body. No debe afectar al ID!
router.put("/:pid", validateProduct, async (req, res) => {
  const prodId = req.params.pid;
  const newProduct = req.body;

  //creo instancia de la clase
  const instancia1 = new ProductManager();

  //actualizo los datos
  try {
    await instancia1.updateProduct(prodId, newProduct);
    res.status(200).send({ exito: "se actualizo con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Debe eliminar el producto con el pid indicado
router.delete("/:pid", async (req, res) => {
  const prodId = Number(req.params.pid);

  //creo instancia de la clase
  const instancia1 = new ProductManager();

  //solicito el borrado
  try {
    await instancia1.deleteProduct(prodId);
    res.status(200).send({ exito: "fue borrado con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
