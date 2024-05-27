import mongoose from "mongoose";

const nameCollection = "tickets";

const customScheema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
  purchase_datetime: { type: Date, default: Date.now },
});

export const ticketModel = mongoose.model(nameCollection, customScheema);
