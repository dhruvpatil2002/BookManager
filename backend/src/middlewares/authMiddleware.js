import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    console.log("VERIFY SECRET:", process.env.JWT_SECRET);
console.log("Cookies:", req.cookies);
console.log("Authorization:", req.headers.authorization);

let token;
    // Authorization Header
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Cookie
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }
    console.log("RECEIVED TOKEN:", token);


    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Not authorized",
      error: error.message,
    });
  }
};