import mongoose from "mongoose";

const nameCollection = "tickets"; // asi se llama la coleccion en la base de datos

const customScheema = new mongoose.Schema({
  //aqui escribimos todas las propiedades que debe tener nuestro modelo
  code: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
  purchase_datetime: { type: Date, default: Date.now },
});

export const ticketModel = mongoose.model(nameCollection, customScheema);
