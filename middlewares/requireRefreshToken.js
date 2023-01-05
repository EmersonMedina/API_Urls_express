import jwt from "jsonwebtoken";

export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    console.log(refreshToken);
    if (!refreshToken) throw new Error("No Bearer token");

    const { userId } = jwt.verify(refreshToken, process.env.JWT_REFRESH);

    req.userId = userId;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error.message });
  }
};
