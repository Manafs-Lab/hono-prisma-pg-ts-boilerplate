import booksRoute from "@api/books/books-route";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { globalErrorHandler } from "./helpers/error-handler";

const app = new Hono();
app.use(cors());

app.get("/health", (ctx) => {
  return ctx.json({ status: "success", message: "Health is good" });
});

app.route("/api/v1/books", booksRoute);

app.onError(globalErrorHandler);

const port = Number.parseInt(process.env.PORT || "4200", 10);
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
