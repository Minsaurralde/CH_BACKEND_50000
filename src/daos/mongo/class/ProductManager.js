import mongoose from "mongoose";
import mongoUri from "../constants/mongourl.js";
import { productModel } from "../models/product.model.js";

class ProductManager {
  DBconection = mongoose.connect(mongoUri);

  getProducts = async (limit = 10, page = 1, sort = "", filter, filterVal) => {
    let whereOptions = {};

    if (filter && filterVal) {
      whereOptions = { [filter]: filterVal }; // para hacer dinamica la key se utiliza este tipo de notacion en objetos
    }

    let result = {
      status: undefined,
      payload: {},
      totalPages: 0,
      prevPage: "",
      nextPage: "",
      page: "",
      hasPrevPage: false,
      hasNextPage: false,
      prevLink: "",
      nextLink: "",
    };

    try {
      const queryResult = await productModel.paginate(whereOptions, {
        limit: limit,
        page: page,
        sort: sort ? { price: sort.toString() } : "",
        lean: true,
      });

      result = {
        status: "success", // success/error
        payload: queryResult.docs, // Resultado de los productos solicitados
        totalPages: queryResult.totalPages, // Total de páginas
        prevPage: queryResult.hasPrevPage ? queryResult.page - 1 : null, // Página anterior
        nextPage: queryResult.hasNextPage ? queryResult.page + 1 : null, // Página siguiente
        page: queryResult.page, // Página actual
        hasPrevPage: queryResult.hasPrevPage, // Indicador para saber si la página previa existe
        hasNextPage: queryResult.hasNextPage, // Indicador para saber si la página siguiente existe.
        prevLink: queryResult.hasPrevPage
          ? `http://localhost:8080?limit=${limit}&page=${
              page - 1
            }&sort=${sort}&filter=${filter ? filter : ""}&filterVal=${
              filterVal ? filterVal : ""
            }`
          : null, // Link directo a la página previa (null si hasPrevPage=false)
        nextLink: queryResult.hasNextPage
          ? `http://localhost:8080?limit=${limit}&page=${
              page + 1
            }&sort=${sort}&filter=${filter ? filter : ""}&filterVal=${
              filterVal ? filterVal : ""
            }`
          : null, // Link directo a la página siguiente (null si hasNextPage=false)
      };
    } catch (error) {
      console.log("error: ", error);

      result = { ...result, status: "error" };
    }

    return result;
  };

  getProductById = async (id) => {
    let result = await productModel.findOne({ _id: id });
    return result;
  };

  addProduct = async (product) => {
    const newProduct = { ...product, status: true };
    const result = await productModel.create(newProduct);
    return result;
  };

  updateProduct = async (id, product) => {
    let result = await productModel.updateOne({ _id: id }, { $set: product });
    return result;
  };

  deleteProduct = async (id) => {
    let result = await productModel.deleteOne({ _id: id });
    return result;
  };
}

export default ProductManager;
