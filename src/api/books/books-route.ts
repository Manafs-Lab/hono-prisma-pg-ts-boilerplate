import { Hono } from "hono";
import {
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
} from "./books-controller";

const router = new Hono();

router.post("/", createBook);

router.get("/", getAllBooks);

router.get("/:id", getBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

export default router;
