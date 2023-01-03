import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
  try {
    console.log(req.headers);

    let token = req.headers?.authorization;

    if (!token) throw new Error("Does not have authorization");

    token = token.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log(payload);

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error.message });
  }
};
