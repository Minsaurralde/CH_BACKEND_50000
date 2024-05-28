import { generateId } from "../utils/uuid.js";
import { cartModel } from "./mongo/models/cart.model.js";
import { ticketModel } from "./mongo/models/ticket.model.js";
import productStore from "./product.store.js";

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

  const existsProd = prodList.findIndex(
    (el) => el.product._id.toString() === prodID
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

const updateAllProductsCart = async (cartID, newProducts) => {
  const cart = await getCartsById(cartID);
  prodList = newProducts;
  cart.save();

  return;
};

const purchaseCart = async (cartID, email) => {
  const cart = await getCartsById(cartID);
  const shopingList = cart.products;

  let finalPrice = 0;
  let purchaseOK = [];
  let purchaseNOK = [];

  for (let index = 0; index < shopingList.length; index++) {
    const element = shopingList[index];

    const product = await productStore.getProductById(element.product._id);
    const stock = element.product.stock;
    const qty = element.quantity;

    if (stock > qty) {
      //valido y updateo stock
      product.stock -= qty;
      product.save();
      // lo contabilizo para el cobro
      finalPrice += product.price * qty;
      purchaseOK.push(element);
    } else {
      // si no tengo stock, lo guardo en un array
      purchaseNOK.push(element);
    }
  }

  // elimino los productos del carro
  deleteAllProductsCart(cartID);

  if (purchaseOK.length) {
    const newTicket = {
      code: generateId(),
      amount: finalPrice,
      purchaser: email,
    };
    // enviar numero de ticket
    const result = await ticketModel.create(newTicket);
    return {
      ticket: result,
      successProducts: purchaseOK,
      noStockProducts: purchaseNOK,
    };
  }
};

export default {
  getCarts,
  getCartsById,
  addCart,
  addProductCart,
  deleteProductCart,
  deleteAllProductsCart,
  updateAllProductsCart,
  purchaseCart,
};
