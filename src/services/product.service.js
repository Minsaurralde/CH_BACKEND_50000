import store from "../store/product.store.js";

const getAll = async (limit, page, sort, filter, filterVal) => {
  const result = await store.getProducts(limit, page, sort, filter, filterVal);
  return result;
};

const getById = async (id) => {
  let result = await store.getProductById(id);
  return result;
};

const newProduct = async (product) => {
  const result = await store.addProduct(product);
  return result;
};

const updateById = async (id, product) => {
  let result = await store.updateProduct(id, product);
  return result;
};

const deleteById = async (id) => {
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
