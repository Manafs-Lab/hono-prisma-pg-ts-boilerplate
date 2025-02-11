import { NODE_ENV, NODE_ENVS } from "@config/constants";
import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export const globalErrorHandler = (error: unknown, ctx: Context) => {
	const err = error as IAppError;
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
			err.status || 500,
		);
	}

	return ctx.json(
		{ ...err, message: err.message, stack: err.stack },
		err.status || 500,
	);
};

export const controllerError = (error: unknown) => {
	const err = error as IAppError;
	return Object.assign(new Error(), {
		...err,
		name: err.name,
		status: err.status,
		message: err.message,
	});
};

export interface IAppError extends Error {
	message: string;
	name: string;
	status?: ContentfulStatusCode;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	[key: string]: any;
}
