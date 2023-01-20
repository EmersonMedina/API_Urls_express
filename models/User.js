import moongose from "mongoose";
import bcryptjs from "bcryptjs";
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
  name: {
    type: String,
    default: "",
  },
  photoURL: {
    type: String,
    default: "",
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Hash password failed");
  }
});

userSchema.methods.comparePassword = async function (clientPassword) {
  return await bcryptjs.compare(clientPassword, this.password);
};

export const User = model("User", userSchema);
