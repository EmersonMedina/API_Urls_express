import moongose, { Schema } from "mongoose";
const { Schema, model } = moongose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

export const user = model("user", userSchema);
