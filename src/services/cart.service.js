import store from "../store/cart.store.js";

const getAll = async () => {
  let result = await store.getCarts();
  return result;
};

const getById = async (id) => {
  if (!id) {
    throw new Error("service responde: faltan datos obligatorios");
  }

  let result = await store.getCartsById(id);
  return result;
};

const newCart = async () => {
  const result = await store.addCart();
  return result._id;
};

const addProduct = async (cartID, prodID, Qty) => {
  if (!cartID || !prodID || !Qty) {
    throw new Error("service responde: faltan datos obligatorios");
  }

  await store.addProductCart(cartID, prodID, Qty);
  return;
};

const deleteProduct = async (cartID, prodID) => {
  if (!cartID || !prodID) {
    throw new Error("service responde: faltan datos obligatorios");
  }

  await store.deleteProductCart(cartID, prodID);
  return;
};

const deleteAllProducts = async (cartID) => {
  if (!cartID) {
    throw new Error("service responde: faltan datos obligatorios");
  }

  await store.deleteAllProductsCart(cartID);
  return;
};

const updateProduct = async (cartID, prodID, Qty) => {
  if (!cartID || !prodID || !Qty) {
    throw new Error("service responde: faltan datos obligatorios");
  }

  await store.updateProductCart(cartID, prodID, Qty);
  return;
};

const updateAllProducts = async (cartID, newProducts) => {
  if (!cartID || !newProducts) {
    throw new Error("service responde: faltan datos obligatorios");
  }

  await store.updateAllProductsCart(cartID, newProducts);
  return;
};

const purchaseCart = async (cartID, email) => {
  if (!cartID || !email) {
    throw new Error("service responde: faltan datos obligatorios");
  }

  const result = await store.purchaseCart(cartID, email);
  return result;
};

export default {
  getAll,
  getById,
  newCart,
  addProduct,
  deleteProduct,
  deleteAllProducts,
  updateProduct,
  updateAllProducts,
  purchaseCart,
};
