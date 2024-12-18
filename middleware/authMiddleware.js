import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "unauthorized:no token provided" });
  }
  try {
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(403)
          .json({ message: "Access Denied:Insufficient role" });
      }
      next();
    } catch (err) {
      res.status(500).json({ message: "Internal Server error" });
    }
  };
};
