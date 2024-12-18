import express from "express";
import connectDB from "./config/db.js";
import Bookrouter from "./routes/bookRoutes.js";
import Authrouter from "./routes/authRoutes.js";
import Userrouter from "./routes/userRoutes.js";
import setupmiddleware from "./middleware/index.js";

const app = express();
connectDB();

// middleware
setupmiddleware(app);

// routes
app.use("/api/books", Bookrouter);
app.use("/api/auth",Authrouter);
app.use("/api/users",Userrouter);

export default app;
