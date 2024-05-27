import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const nameCollection = "carts";

const customScheema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
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
