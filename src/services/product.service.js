import CustomError from "../handlers/errors/custom-error.js";
import {
  EErrorCode,
  EErrorMsg,
  EErrorName,
} from "../handlers/errors/enum-errors.js";
import store from "../store/product.store.js";

const getAll = async (limit, page, sort, filter, filterVal) => {
  const result = await store.getProducts(limit, page, sort, filter, filterVal);
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

  let result = await store.getProductById(id);
  return result;
};

const newProduct = async (product) => {
  if (!product) {
    // throw new Error("service responde: faltan datos obligatorios");
    CustomError.createError({
      name: EErrorName.MISSING_DATA,
      cause: `* product   : id need to be an object, receibed ${product}`,
      message: EErrorMsg.MISSING_DATA,
      code: EErrorCode.BAD_REQUEST,
    });
  }

  const result = await store.addProduct(product);
  return result;
};

const updateById = async (id, product) => {
  if (!id || !product) {
    // throw new Error("service responde: faltan datos obligatorios");
    CustomError.createError({
      name: EErrorName.MISSING_DATA,
      cause: `
      List of required properties:
      * id       : id need to be a string, receibed ${id}
      * product  : prodID need to be an object, receibed ${product}
      `,
      message: EErrorMsg.MISSING_DATA,
      code: EErrorCode.BAD_REQUEST,
    });
  }

  let result = await store.updateProduct(id, product);
  return result;
};

const deleteById = async (id) => {
  if (!id) {
    // throw new Error("service responde: faltan datos obligatorios");
    CustomError.createError({
      name: EErrorName.MISSING_DATA,
      cause: `* id    : id need to be a string, receibed ${id}`,
      message: EErrorMsg.MISSING_DATA,
      code: EErrorCode.BAD_REQUEST,
    });
  }

  let result = await store.deleteProduct(id);
  return result;
};

export default {
  getAll,
  getById,
  newProduct,
  updateById,
  deleteById,
};
