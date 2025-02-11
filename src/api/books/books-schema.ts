import { z } from "zod";

export const BookSchema = z.object({
	id: z.number().int().positive(),
	title: z.string().min(1, "Title is required"),
	description: z.string().optional(),
	author: z.string().min(1, "Author is required"),
});

export type TBook = z.infer<typeof BookSchema>;

export const CreateBookSchema = BookSchema.omit({ id: true });

export type TCreateBook = z.infer<typeof CreateBookSchema>;

export const UpdateBookSchema = BookSchema.partial().extend({
	id: z.number().int().positive(),
});

export type TUpdateBook = z.infer<typeof UpdateBookSchema>;
