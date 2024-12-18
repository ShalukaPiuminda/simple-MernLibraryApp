import express from "express";
import { register, login } from "../Controller/authController.js";
import { verifyToken, checkRole } from "../middleware/authMiddleware.js";
import { forgotPassword,resetPassword } from "../Controller/authController.js";


const Authrouter = express.Router();

// register a user
Authrouter.post("/register", register);

// login a user
Authrouter.post("/login", login);

// protected route -only  access by admin
Authrouter.get("/admin", verifyToken, checkRole(["admin"]), (req, res) => {
  res.json({ message: "Welcome ,Admin!!" });
});

// forgot password
Authrouter.post('/forgot-password',forgotPassword);

// reset password
Authrouter.put('/reset-password/:token',resetPassword);


export default Authrouter;
