import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const nameCollection = "products";

const customScheema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
  status: { type: Boolean, required: true },
});

customScheema.plugin(mongoosePaginate);
export const productModel = mongoose.model(nameCollection, customScheema);
