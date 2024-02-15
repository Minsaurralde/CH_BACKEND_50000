import mongoose from "mongoose";
import mongoUri from "../constants/mongourl.js";
import { cartModel } from "../models/cart.model.js";

class CartManager {
  DBconection = mongoose.connect(mongoUri);

  getCarts = async () => {
    let result = await cartModel.find();
    return result;
  };

  getCartsById = async (id) => {
    let result = await cartModel.findOne({ _id: id });
    return result;
  };

  addCart = async () => {
    const newCart = {
      products: [],
    };
    const result = await cartModel.create(newCart);
    return result;
  };

  addProductCart = async (cartID, prodID, Qty) => {
    if (!cartID || !prodID || !Qty) {
      throw new Error("addProductCart responde: faltan datos obligatorios");
    }

    const cart = await this.getCartsById(cartID);

    const prodList = cart.products;
    console.log(prodList);

    const existsProd = prodList.findIndex(
      (el) => el.product.toString() === prodID
    );

    if (existsProd == -1) {
      cart.products.push({ product: prodID, quantity: Qty });
    } else {
      prodList[existsProd].quantity += Qty;
    }

    cart.save();

    return;
  };

  deleteProductCart = async (cartID, prodID) => {
    if (!cartID || !prodID) {
      throw new Error("deleteProductCart responde: faltan datos obligatorios");
    }

    const cart = await this.getCartsById(cartID);
    const foundProduct = cart.products.find((p) => p.product == prodID);

    if (!foundProduct) {
      throw new Error(
        "deleteProductCart responde: el carrito no contiene ese producto"
      );
    } else {
      cart.products.pull(foundProduct._id);
      await cart.save();
    }

    return;
  };

  deleteAllProductsCart = async (cartID) => {
    if (!cartID) {
      throw new Error("deleteProductCart responde: faltan datos obligatorios");
    }

    const cart = await this.getCartsById(cartID);

    cart.products = [];
    await cart.save();

    return;
  };

  updateProductCart = async (cartID, prodID, Qty) => {
    if (!cartID || !prodID || !Qty) {
      throw new Error("addProductCart responde: faltan datos obligatorios");
    }

    const cart = await this.getCartsById(cartID);

    const prodList = cart.products;
    console.log(prodList);

    const existsProd = prodList.findIndex(
      (el) => el.product.toString() === prodID
    );

    if (existsProd == -1) {
      cart.products.push({ product: prodID, quantity: Qty }); // si no existe lo creo
    } else {
      prodList[existsProd].quantity = Qty; // si existe, piso el dato
    }
    cart.save();

    return;
  };

  updateAllProductsCart = async (cartID, newProducts) => {
    if (!cartID || !newProducts) {
      throw new Error("addProductCart responde: faltan datos obligatorios");
    }

    const cart = await this.getCartsById(cartID);
    const prodList = cart.products;
    console.log(prodList);

    prodList = newProducts;
    cart.save();

    return;
  };
}

export default CartManager;
