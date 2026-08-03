import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
  console.log("SIGN SECRET:", process.env.JWT_SECRET);

  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  console.log("GENERATED TOKEN:", token);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};