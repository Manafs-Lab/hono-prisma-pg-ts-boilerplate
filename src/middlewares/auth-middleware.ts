// import { supabase } from "@lib/supabase";
import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";

export const authMiddleware = async (ctx: Context, next: Next) => {
	// 1. cookie based (recommended)
	const token = getCookie(ctx, "accessToken");

	// 2. Authorization header based
	// const authHeader = ctx.req.header("Authorization");

	// if (!authHeader || !authHeader.startsWith("Bearer ")) {
	//   return ctx.json({ error: "Missing or invalid Authorization header" }, 401);
	// }

	// const token = authHeader.split(" ")[1];

	if (!token) {
		return ctx.json({ message: "Missing access token" }, 401);
	}

	// const { data: userData, error } = await supabase.auth.getUser(token);
	const error = "yourError";
	if (error) {
		return ctx.json({ message: "Invalid token" }, 401);
	}

	ctx.set("user", "yourUserData");

	await next();
};
