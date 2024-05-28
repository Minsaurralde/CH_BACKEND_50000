import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const nameCollection = "users";

const customScheema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
    autopopulate: true,
  },
  last_login: { type: Date, default: Date.now },
});

customScheema.plugin(autopopulate);
export const userModel = mongoose.model(nameCollection, customScheema);
