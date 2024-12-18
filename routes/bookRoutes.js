import express from "express";
import { verifyToken,checkRole } from "../middleware/authMiddleware.js";
import {
  CreateBook,
  GetAllBooks,
  GetSingleBook,
  UpdateBook,
  DeleteBook,
} from "../Controller/BookController.js";

const Bookrouter = express.Router();

// book routes

Bookrouter.post("/",verifyToken,checkRole(['admin']),CreateBook);
Bookrouter.get("/",verifyToken,checkRole(['admin']),GetAllBooks);
Bookrouter.get("/:id",verifyToken,checkRole(['admin']), GetSingleBook);
Bookrouter.put("/:id",verifyToken,checkRole(['admin']),UpdateBook);
Bookrouter.delete("/:id",verifyToken,checkRole(['admin']),DeleteBook);

export default Bookrouter;
