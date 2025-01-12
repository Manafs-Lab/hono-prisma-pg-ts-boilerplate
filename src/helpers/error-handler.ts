import { NODE_ENV, NODE_ENVS } from "@config/constants";
import { Context } from "hono";

export const globalErrorHandler = (err: any, ctx: Context) => {
  console.error("ERROR: ", err);
  if (err.name === "ZodError") {
    if (NODE_ENV === NODE_ENVS.PROD) {
      return ctx.json({ message: err.message }, 400);
    }
    return ctx.json(err, 400);
  }

  if (NODE_ENV === NODE_ENVS.PROD) {
    return ctx.json(
      { message: err.message || "Internal Server Error" },
      err.status || 500
    );
  }

  return ctx.json(
    { ...err, message: err.message, stack: err.stack },
    err.status || 500
  );
};

export const controllerError = (err: any) => {
  return Object.assign(new Error(), {
    ...err,
    name: err.name,
    status: err.status,
    message: err.message,
  });
};
