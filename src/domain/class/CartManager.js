import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = `./src/db_local/${path}`;
  }

  getCarts = async () => {
    let carts = [];

    if (fs.existsSync(this.path)) {
      const file = await fs.promises.readFile(this.path, "utf-8");
      if (file) {
        //si hay datos, parceo y retorno
        carts = JSON.parse(file);
        return carts;
      }
    }
    //si no hay datos, retorno []
    return carts;
  };

  getCartsById = async (id) => {
    const carts = await this.getCarts(); // lista de  carritos existente
    const found = carts.find((element) => element.id == id);

    // En caso de no coincidir ningún id, mostrar en consola un error
    if (!found) {
      throw new Error("getCartsById responde: No se encontro el id");
    }

    return found;
  };

  addCart = async () => {
    const carts = await this.getCarts(); // lista de productos existente

    // - Al agregarlo, se genera un id autoincrementable.
    let idmax = 1;
    if (carts.length) {
      idmax = Math.max(...carts.map((element) => element.id)) + 1;
    }
    const newObject = {
      id: idmax,
      products: [],
    };

    carts.push(newObject); // actualizo lista

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));

    return console.info("addProduct responde: Ingresado con exito!");
  };

  addProductCart = async (cartID, prodID, Qty) => {
    if (!cartID || !prodID || !Qty) {
      throw new Error("addProductCart responde: faltan datos obligatorios");
    }

    const isValidCartID = await this.getCartsById(cartID);
    if (!isValidCartID) {
      throw new Error(
        "addProductCart responde: No es posible actualizar. El id no existe."
      );
    }

    const carts = await this.getCarts(); // lista de productos existente
    const index = carts.findIndex((el) => el.id == cartID);

    const prodList = carts[index].products;

    const existsProd = prodList.findIndex((el) => el.product === prodID);
    if (existsProd == -1) {
      prodList.push({ product: prodID, quantity: Qty });
    } else {
      prodList[existsProd].quantity += Qty;
    }

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));

    return console.info(
      "addProductCart responde: El producto se agrego con exito!"
    );
  };
}

export default CartManager;
