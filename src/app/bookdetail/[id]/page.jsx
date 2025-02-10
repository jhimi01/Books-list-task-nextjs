"use client";
import React, { useEffect } from "react";
import books from "../.././../../public/booklist.json";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Heart, Star, StarHalf } from "lucide-react";
import { bookStore } from "@/store/books";
import AddFavorite from "@/components/AddFavorite";

export default function BookDetail({ params }) {
  // const books = bookStore((state) => state.books);
  const { id } = useParams(); // Get the book ID from the URL
  const fetchBookById = bookStore((state) => state.fetchBookById);
  const book = bookStore((state) => state.book);

  useEffect(() => {
    if (id) {
      fetchBookById(id);
    }
  }, [id, fetchBookById]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wrapper mt-10">
      <div className="px-20">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Book Cover Image */}
          <div className="border p-16">
            <Image
              height={500}
              width={500}
              src={book?.coverImage}
              alt="book cover image"
              className="w-64 h-96 object-cover"
            />
          </div>
          {/* Book Details */}
          <div className="flex-1 p-5">
            <div className="flex items-center  gap-10">
              <h1 className="text-4xl font-bold mb-4 text-gray-800">
                <span className="capitalize">name:</span> {book.title}
              </h1>
              <h4 className="text-xl text-green-500 font-semibold">
                available
              </h4>
            </div>
            <h3 className="mb-3 flex items-center gap-1 text-yellow-400">
              <Star /> <Star /> <Star /> <Star /> <Star />
            </h3>
            <p className="text-gray-600 text-lg mb-2">
              <span className="font-semibold">Author:</span> {book.author}
            </p>
            <p className="text-gray-600 text-lg mb-2">
              <span className="font-semibold">Genre:</span>{" "}
              <span className="bg-primary-800 text-white px-3 py-1">
                {book.genreName}
              </span>
            </p>
            <p className="text-gray-600 text-lg mb-4">
              <span className="font-semibold">Published:</span>{" "}
              {new Date(book?.publishedAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              {book.description}
            </p>

            <button className="hover:bg-primary-700  flex item-center px-4 py-2 bg-primary-800 duration-300 gap-2 text-white font-semibold mt-4">
              Add to favorite <AddFavorite bookId={book?.id} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
