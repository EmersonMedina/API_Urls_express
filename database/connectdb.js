import mongoose from "mongoose";

try {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.URL_MONGO);
  console.log("Connected to Mongo successfully 🐻‍❄️");
} catch (error) {
  console.error("Somenthing went wrong while conecting to mongo:" + error);
}
