import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const nameCollection = "products"; // asi se llama la coleccion en la base de datos

const customScheema = new mongoose.Schema({
  //aqui escribimos todas las propiedades que debe tener nuestro modelo
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
  status: { type: Boolean, required: true },
});

customScheema.plugin(mongoosePaginate); // agrego el plugin para controlar la paginacion
export const productModel = mongoose.model(nameCollection, customScheema);
