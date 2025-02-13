import mongoose from "mongoose";
import "dotenv/config.js";


export const connectDB = async () => {
 /*  const MONGO = `${process.env.MONGO}`; */
 const MONGO = "mongodb+srv://agustinmorro:cytGbBr5PQdMiA0H@cluster0.4yegq.mongodb.net"
  try {
    await mongoose.connect(MONGO);
    console.log("Conexion a mongo exitosa");
  } catch (error) {
    console.log(error);
  }
};
