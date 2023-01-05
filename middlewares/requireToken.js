import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;

    if (!token) throw new Error("Does not have authorization");

    token = token.split(" ")[1];

    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = userId;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error.message });
  }
};
