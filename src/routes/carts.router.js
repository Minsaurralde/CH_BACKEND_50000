import { Router } from "express";
import ProductManager from "../daos/mongo/class/ProductManager.js";
import CartManager from "../daos/mongo/class/CartManager.js";

const router = Router();

// Debe crear un nuevo carrito. estructura id: number|string, products: []
router.post("/", async (req, res) => {
  const newProduct = req.body;
  //creo instancia de la clase
  const instancia1 = new CartManager();

  //agrego un carrito
  try {
    const response = await instancia1.addCart();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Debe listar los productos que pertenezcan al carrito.
router.get("/", async (req, res) => {
  //creo instancia de la clase
  const instancia1 = new CartManager();

  //solicito los datos
  try {
    const response = await instancia1.getCarts();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Debe listar los productos que pertenezcan al carrito con el parámetro cid.
router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;

  //creo instancia de la clase
  const instancia1 = new CartManager();

  //solicito los datos
  try {
    const response = await instancia1.getCartsById(cartId);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Debe agregar el producto al arreglo “products” del carrito seleccionado. estructura "product": id, "quantity": N (si ya existe el prod, incrementar)
router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const prodId = req.params.pid;

  //creo instancia de la clase
  const instancia1 = new ProductManager();
  const instancia2 = new CartManager();

  //inserto los datos
  try {
    await instancia1.getProductById(prodId); // 1 - valido prodId
    await instancia2.addProductCart(cartId, prodId, 1); // 2 - proceso el update
    res.status(200).send({ exito: "fue agregado con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Debe eliminar del carrito el producto seleccionado.
router.delete("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const prodId = req.params.pid;

  //creo instancia de la clase
  const instancia2 = new CartManager();

  //inserto los datos
  try {
    await instancia2.deleteProductCart(cartId, prodId); // 2 - proceso el borrado
    res.status(200).send({ exito: "se elimino con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Debe eliminar del carrito todos los productos
router.delete("/:cid", async (req, res) => {
  const cartId = req.params.cid;

  //creo instancia de la clase
  const instancia2 = new CartManager();

  //inserto los datos
  try {
    await instancia2.deleteAllProductsCart(cartId); // 2 - proceso el borrado
    res.status(200).send({ exito: "los productos se eliminaron con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Debe poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const prodId = req.params.pid;
  const qty = req.body.qty;

  //creo instancia de la clase
  const instancia1 = new ProductManager();
  const instancia2 = new CartManager();

  //inserto los datos
  try {
    await instancia1.getProductById(prodId); // 1 - valido que exista el prodId
    await instancia2.updateProductCart(cartId, prodId, qty); // 2 - proceso el update
    res.status(200).send({ exito: "se actualizo con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Debe actualizar el carrito con un arreglo de productos con el formato especificado
router.put("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const newProducts = req.body;

  //creo instancia de la clase
  const instancia1 = new ProductManager();
  const instancia2 = new CartManager();

  //inserto los datos
  try {
    await instancia2.updateAllProductsCart(cartId, newProducts); // 2 - proceso el update
    res.status(200).send({ exito: "se actualizo con exito" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
