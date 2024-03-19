import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const nameCollection = "users"; // asi se llama la coleccion en la base de datos

const customScheema = new mongoose.Schema({
  //aqui escribimos todas las propiedades que debe tener nuestro modelo
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts", // NOTA: esta referencia es el nombre del modelo ( nameCollection )
    autopopulate: true,
  },
});

customScheema.plugin(autopopulate);
export const userModel = mongoose.model(nameCollection, customScheema);
