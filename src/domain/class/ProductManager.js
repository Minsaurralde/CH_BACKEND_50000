import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = `./src/db_local/${path}`;
  }

  getProducts = async () => {
    let products = [];

    if (fs.existsSync(this.path)) {
      const file = await fs.promises.readFile(this.path, "utf-8");
      if (file) {
        //si hay datos, parceo y retorno
        products = JSON.parse(file);
        return products;
      }
    }
    //si no hay datos, retorno []
    return products;
  };

  getProductById = async (id) => {
    const products = await this.getProducts(); // lista de productos existente
    const found = products.find((element) => element.id == id);

    // En caso de no coincidir ningún id, mostrar en consola un error
    if (!found) {
      throw new Error("getProductById responde: No se encontro el id");
    }

    return found;
  };

  addProduct = async (obj) => {
    const status = true;
    const { title, description, price, thumbnail, code, stock } = obj;
    // - Todos los campos son obligatorios a excepcion de thumbnail
    if (!title || !description || !price || !code || !stock) {
      throw new Error("addProduct responde: faltan datos obligatorios");
    }

    const products = await this.getProducts(); // lista de productos existente

    // - No se puede repetir el campo "code".
    const found = products.find((element) => element.code == code);
    if (found) {
      throw new Error("addProduct responde: El code ingresado ya existe");
    }
    // - Al agregarlo, se genera un id autoincrementable.
    let idmax = 1;
    if (products.length) {
      idmax = Math.max(...products.map((element) => element.id)) + 1;
    }
    const newObject = {
      id: idmax,
      title,
      description,
      price: Number(price),
      thumbnail,
      code: Number(code),
      stock: Number(stock),
      status,
    };

    products.push(newObject); // actualizo lista

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );

    return newObject;
  };

  updateProduct = async (obj) => {
    //NUEVO!!! Debe recibir el id y campo a actualizar (puede ser el objeto completo). Debe actualizar el producto que tenga ese id.
    const { id, title, description, price, thumbnail, code, stock } = obj;
    if (
      !id &&
      (!title || !description || !price || !thumbnail || !code || !stock)
    ) {
      throw new Error("updateProduct responde: faltan datos obligatorios");
    }

    const isValidID = await this.getProductById(id);
    if (!isValidID) {
      throw new Error(
        "updateProduct responde: No es posible actualizar. El id no existe."
      );
    }

    const products = await this.getProducts(); // lista de productos existente

    if (code) {
      const filter = [...products].filter((el) => el.id !== id);
      const found = filter.find((element) => element.code === code);
      if (found) {
        throw new Error(
          "updateProduct responde: No es posible actualizar. El code ingresado ya existe."
        );
      }
    }

    const index = products.findIndex((element) => element.id == id);
    products[index] = { ...products[index], ...obj };

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );

    return console.info("updateProduct responde: Se actualizo con exito!");
  };

  deleteProduct = async (id) => {
    //NUEVO!!! Debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.
    const isValidID = await this.getProductById(id);
    if (!isValidID) {
      throw new Error(
        "deleteProduct responde: No es posible borrar. El id ingresado no existe."
      );
    }

    const products = await this.getProducts(); // lista de productos existente
    const filter = products.filter((el) => el.id !== id);

    await fs.promises.writeFile(this.path, JSON.stringify(filter, null, "\t"));

    return console.info("deleteProduct responde: Fue borrado con exito!");
  };
}

export default ProductManager;
