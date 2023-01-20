import moongose from "mongoose";
const { Schema, model } = moongose;

const linkSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  longLink: {
    type: String,
    required: true,
    trim: true,
  },
  nanoLink: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Link = model("Link", linkSchema);
