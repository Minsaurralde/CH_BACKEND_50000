import { Router } from "express";
import { validateProduct } from "../middleware/validateProduct.js";
import ProductManager from "../domain/class/ProductManager.js";

const router = Router();

// Debe leer el archivo de productos y devolverlos dentro de un objeto. query param = limit determina el maximo de obj en la resp.
router.get("/", async (req, res) => {
  const limit = Number(req.query.limit);
  //creo instancia de la clase
  const instancia1 = new ProductManager("productos.txt");
  //obtengo los datos
  const data = await instancia1.getProducts();

  if (limit) {
    data.length > limit && data.splice(0, limit + 1);
  }

  res.status(200).send(data);
});

// Debe devolver el objeto que coincida con el id que llega por params.
router.get("/:pid", async (req, res) => {
  const prodId = Number(req.params.pid);
  //creo instancia de la clase
  const instancia1 = new ProductManager("productos.txt");
  //obtengo los datos
  try {
    const data = await instancia1.getProductById(prodId);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// NUEVO!!! Debe agregar un nuevo prod con un id autogenerado
router.post("/", validateProduct, async (req, res) => {
  const newProduct = req.body;
  //creo instancia de la clase
  const instancia1 = new ProductManager("productos.txt");
  //inserto los datos
  try {
    await instancia1.addProduct(newProduct);
    res.status(200).send({ exito: "fue agregado con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// NUEVO!!! Debe tomar un producto y actualizarlo por los campos enviados desde body. No debe afectar al ID!
router.put("/:pid", validateProduct, async (req, res) => {
  const prodId = Number(req.params.pid);
  const newProduct = req.body;
  newProduct.id = prodId;

  //creo instancia de la clase
  const instancia1 = new ProductManager("productos.txt");

  //actualizo los datos
  try {
    await instancia1.updateProduct(newProduct);
    res.status(200).send({ exito: "se actualizo con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// NUEVO!!! Debe eliminar el producto con el pid indicado
router.delete("/:pid", async (req, res) => {
  const prodId = Number(req.params.pid);

  //creo instancia de la clase
  const instancia1 = new ProductManager("productos.txt");

  //solicito el borrado
  try {
    await instancia1.deleteProduct(prodId);
    res.status(200).send({ exito: "fue borrado con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
