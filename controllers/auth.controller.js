import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();

    //jwt
    //Generate JWT token
    const { token, expiresIn } = generateToken(user.id);

    generateRefreshToken(user.id, res);

    return res.status(201).json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    if (error.code === 11000)
      return res.status(400).json({ message: "The email is already in use" });

    return res.status(500).json({ message: "An error occurred on the server" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const isGoodPassword = await user.comparePassword(password);

    if (!isGoodPassword) {
      return res.status(400).json({ message: "Incorrect user or password" });
    }

    //Generate JWT token
    const { token, expiresIn } = generateToken(user.id);

    generateRefreshToken(user.id, res);

    res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred on the server" });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.userId);

    res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);

    return res.sratus(401).send({ error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};
