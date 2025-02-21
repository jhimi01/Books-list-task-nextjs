"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect } from "react";
import { bookStore } from "@/store/books";
import Image from "next/image";
import Link from "next/link";
import AddFavorite from "../AddFavorite";

export default function BookTable() {
  const books = bookStore((state) => state.books);
  const fetchbooks = bookStore((state) => state.fetchbooks);

  useEffect(() => {
    fetchbooks();
  }, [fetchbooks]);

  console.log("all books", books);

  return (
    <div className="px-5">
      <h1 className="text-2xl font-bold mb-6">All books</h1>
      <Table>
        <TableCaption>A list of all registered users.</TableCaption>
        <TableHeader className="bg-primary-800">
          <TableRow>
            <TableHead className="text-white"></TableHead>
            <TableHead className="text-white">Book Id</TableHead>
            <TableHead className="text-white">Title</TableHead>
            <TableHead className="text-white">Author</TableHead>
            <TableHead className="text-white">Published</TableHead>
            <TableHead className="text-white">Joined</TableHead>
            <TableHead className="text-right text-white">Favorite</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {books?.map((book) => (
            <TableRow key={book.id} className="hover:bg-gray-300">
              <TableCell className="font-medium capitalize">
                <Link href={`/bookdetail/${book.id}`}>
                  <Image
                    src={book?.coverImage}
                    alt="cover img"
                    height={1000}
                    width={1000}
                    className="w-20 h-20 "
                  />
                </Link>
              </TableCell>
              <TableCell className="font-medium capitalize">
                {book.id}
              </TableCell>
              <TableCell className="font-medium capitalize">
                {book.title}
              </TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    book.role === "ADMIN"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {new Date(book.publishedAt).toLocaleDateString()}
                </span>
              </TableCell>
              <TableCell>
                {new Date(book.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="flex items-center justify-center text-primary-800 h-24">
                <AddFavorite bookId={book.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
