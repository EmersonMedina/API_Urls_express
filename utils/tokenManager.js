import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  try {
    const expiresIn = 60 * 15;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn,
    });

    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (userId, res) => {
  const expiresIn = 60 * 60 * 24 * 30;

  try {
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH, {
      expiresIn,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODO === "developer"),
      expires: new Date((Date.now() + expiresIn) * 1000),
      sameSite: "none",
    });
  } catch (error) {
    console.log(error);
  }
};
