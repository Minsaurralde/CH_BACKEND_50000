// import mongoose from "mongoose";
// import mongoUri from "./mongo/config/index.js";
import { cartModel } from "./mongo/models/cart.model.js";

// const DBconection = mongoose.connect(mongoUri);

const getCarts = async () => {
  let result = await cartModel.find();
  return result;
};

const getCartsById = async (id) => {
  let result = await cartModel.findOne({ _id: id });
  return result;
};

const addCart = async () => {
  const newCart = {
    products: [],
  };
  const result = await cartModel.create(newCart);
  return result;
};

const addProductCart = async (cartID, prodID, Qty) => {
  const cart = await getCartsById(cartID);

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

const deleteProductCart = async (cartID, prodID) => {
  const cart = await getCartsById(cartID);
  const foundProduct = cart.products.find((p) => p.product == prodID);

  if (!foundProduct) {
    throw new Error("store responde: el carrito no contiene ese producto");
  } else {
    cart.products.pull(foundProduct._id);
    await cart.save();
  }

  return;
};

const deleteAllProductsCart = async (cartID) => {
  const cart = await getCartsById(cartID);

  cart.products = [];
  await cart.save();

  return;
};

const updateProductCart = async (cartID, prodID, Qty) => {
  const cart = await getCartsById(cartID);

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

const updateAllProductsCart = async (cartID, newProducts) => {
  const cart = await getCartsById(cartID);
  const prodList = cart.products;
  console.log(prodList);

  prodList = newProducts;
  cart.save();

  return;
};

export default {
  getCarts,
  getCartsById,
  addCart,
  addProductCart,
  deleteProductCart,
  deleteAllProductsCart,
  updateProductCart,
  updateAllProductsCart,
};
