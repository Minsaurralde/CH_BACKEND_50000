import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const nameCollection = "carts"; // asi se llama la coleccion en la base de datos

const customScheema = new mongoose.Schema({
  //aqui escribimos todas las propiedades que debe tener nuestro modelo
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products", // NOTA: esta referencia es el nombre del modelo ( nameCollection )
          autopopulate: true,
        },
        quantity: Number,
      },
    ],
    default: [],
  },
});

customScheema.plugin(autopopulate);
export const cartModel = mongoose.model(nameCollection, customScheema);
