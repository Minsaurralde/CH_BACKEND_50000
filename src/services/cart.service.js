import CustomError from "../handlers/errors/custom-error.js";
import {
  EErrorCode,
  EErrorMsg,
  EErrorName,
} from "../handlers/errors/enum-errors.js";
import store from "../store/cart.store.js";

const getAll = async () => {
  let result = await store.getCarts();
  return result;
};

const getById = async (id) => {
  if (!id) {
    // throw new Error("service responde: faltan datos obligatorios");
    CustomError.createError({
      name: EErrorName.MISSING_DATA,
      cause: `* id    : id need to be a string, receibed ${id}`,
      message: EErrorMsg.MISSING_DATA,
      code: EErrorCode.BAD_REQUEST,
    });
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
    // throw new Error("service responde: faltan datos obligatorios");
    CustomError.createError({
      name: EErrorName.MISSING_DATA,
      cause: `
      List of required properties:
      * cartId    : cartId need to be a string, receibed ${cartId}
      * prodID    : prodID need to be a string, receibed ${prodID}
      * Qty       : Qty need to be a number, receibed ${Qty}
      `,
      message: EErrorMsg.MISSING_DATA,
      code: EErrorCode.BAD_REQUEST,
    });
  }

  await store.addProductCart(cartID, prodID, Qty);
  return;
};

const deleteProduct = async (cartID, prodID) => {
  if (!cartID || !prodID) {
    // throw new Error("service responde: faltan datos obligatorios");
    CustomError.createError({
      name: EErrorName.MISSING_DATA,
      cause: `
      List of required properties:
      * cartId    : cartId need to be a string, receibed ${cartId}
      * prodID    : prodID need to be a string, receibed ${prodID}
      `,
      message: EErrorMsg.MISSING_DATA,
      code: EErrorCode.BAD_REQUEST,
    });
  }

  await store.deleteProductCart(cartID, prodID);
  return;
};

const deleteAllProducts = async (cartID) => {
  if (!cartID) {
    // throw new Error("service responde: faltan datos obligatorios");
    CustomError.createError({
      name: EErrorName.MISSING_DATA,
      cause: `
      List of required properties:
      * cartId    : cartId need to be a string, receibed ${cartId}
      `,
      message: EErrorMsg.MISSING_DATA,
      code: EErrorCode.BAD_REQUEST,
    });
  }

  await store.deleteAllProductsCart(cartID);
  return;
};

const updateProduct = async (cartID, prodID, Qty) => {
  if (!cartID || !prodID || !Qty) {
    // throw new Error("service responde: faltan datos obligatorios");
    CustomError.createError({
      name: EErrorName.MISSING_DATA,
      cause: `
      List of required properties:
      * cartId    : cartId need to be a string, receibed ${cartId}
      * prodID    : prodID need to be a string, receibed ${prodID}
      * Qty       : Qty need to be a number, receibed ${Qty}
      `,
      message: EErrorMsg.MISSING_DATA,
      code: EErrorCode.BAD_REQUEST,
    });
  }

  await store.updateProductCart(cartID, prodID, Qty);
  return;
};

const updateAllProducts = async (cartID, newProducts) => {
  if (!cartID || !newProducts) {
    // throw new Error("service responde: faltan datos obligatorios");
    CustomError.createError({
      name: EErrorName.MISSING_DATA,
      cause: `
      List of required properties:
      * cartId      : cartId need to be a string, receibed ${cartId}
      * newProducts : newProducts need to be a array, receibed ${newProducts}
      `,
      message: EErrorMsg.MISSING_DATA,
      code: EErrorCode.BAD_REQUEST,
    });
  }

  await store.updateAllProductsCart(cartID, newProducts);
  return;
};

const purchaseCart = async (cartID, email) => {
  if (!cartID || !email) {
    // throw new Error("service responde: faltan datos obligatorios");
    CustomError.createError({
      name: EErrorName.MISSING_DATA,
      cause: `
      List of required properties:
      * cartId    : cartId need to be a string, receibed ${cartId}
      * email     : does not appear to be an email, receibed ${email}
      `,
      message: EErrorMsg.MISSING_DATA,
      code: EErrorCode.BAD_REQUEST,
    });
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
