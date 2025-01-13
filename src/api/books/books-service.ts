import { prisma } from "@lib/prisma";
import type { TCreateBook, TUpdateBook } from "./books-schema";

export const InsertBook = async (createBookDto: TCreateBook) => {
  const book = await prisma.book.create({ data: createBookDto });
  return book;
};

export const FindAllBooks = async () => {
  const books = await prisma.book.findMany();
  return books;
};

export const FindBook = async (id: number) => {
  const book = await prisma.book.findUnique({ where: { id } });
  return book;
};

export const UpdateBook = async (updateBookDto: TUpdateBook) => {
  const updatedBook = await prisma.book.update({
    where: { id: updateBookDto.id },
    data: updateBookDto,
  });
  return updatedBook;
};

export const RemoveBook = async (id: number) => {
  return prisma.book.delete({ where: { id } });
};
