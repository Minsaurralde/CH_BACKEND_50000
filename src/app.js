import express from "express";
import ProductManager from "./class/ProductManager.js";

const app = express();
//NOTA: que diferencia hace poner la siguiente linea de codigo?
app.use(express.urlencoded({ extended: true }));

// Debe leer el archivo de productos y devolverlos dentro de un objeto. query param = limit determina el maximo de obj en la resp.
app.get("/products", async (req, res) => {
  const limit = Number(req.query.limit);
  //creo instancia de la clase
  const instancia1 = new ProductManager("prodmanager.txt");
  //obtengo los datos
  const data = await instancia1.getProducts();

  if (limit) {
    data.length > limit && data.splice(0, limit + 1);
  }

  res.send(data);
});

// Debe devolver el objeto que coincida con el id que llega por params.
app.get("/products/:pid", async (req, res) => {
  const prodId = Number(req.params.pid);
  //creo instancia de la clase
  const instancia1 = new ProductManager("prodmanager.txt");
  //obtengo los datos
  const data = await instancia1.getProductById(prodId);

  res.send(data ? data : { error: "id inexistente" });
});

app.listen(8080, () => {
  console.log("server ready");
});
