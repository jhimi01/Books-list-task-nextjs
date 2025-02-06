import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function BookCard({ book, isRowLayout }) {
  //   console.log(book.coverImage);
  return (
    <div
      key={book.id}
      className={`${
        isRowLayout ? "flex items-center gap-3" : ""
      } bg-white relative shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300`}
    >
      <div
        className={`${
          isRowLayout ? "top-0 right-0" : "top-1 right-1"
        } absolute  bg-primary-800 py-1 px-3 text-white`}
      >
        {book.genre}
      </div>
      <Image
        alt="book cover"
        height={500}
        width={500}
        src={book?.coverImage}
        className={`${isRowLayout ? "w-72 h-56" : "w-full h-80"} `}
        quality={100}
        priority
        sizes="100vw"
      />
      <div className="p-6 w-full">
        <h2 className="text-xl font-bold truncate mb-2 text-gray-800">
          {book.title}
        </h2>
        {isRowLayout && (
          <div>
            <p className="text-gray-600 text-sm mb-1">
              <span className="font-semibold">Author:</span> {book.author}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              <span className="font-semibold">Genre:</span> {book.genre}
            </p>
            <p className="text-gray-600 text-sm mb-4">
              <span className="font-semibold">Published:</span>{" "}
              {book.publishedYear}
            </p>
          </div>
        )}
        <div className="flex justify-between items-center mt-5">
          <button className="hover:bg-primary-800  px-4 py-2 border rounded-full border-primary-800 text-primary-800 hover:text-white transition-colors duration-300">
            Read More
          </button>
          <button className="text-primary-800">
            <Heart />
          </button>
        </div>
      </div>
    </div>
  );
}
