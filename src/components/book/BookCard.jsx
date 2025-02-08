import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddFavorite from "../AddFavorite";

export default function BookCard({ book, isRowLayout }) {
  return (
    <div
      key={book?.id}
      className={`${
        isRowLayout ? "flex items-center gap-3" : ""
      } bg-white relative shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300`}
    >
      <div
        className={`${
          isRowLayout ? "top-0 right-0" : "top-1 right-1"
        } absolute  bg-primary-800 py-1 px-3 text-white`}
      >
        {book?.genreName}
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
          {book?.title}
        </h2>
        {isRowLayout && (
          <div>
            <p className="text-gray-600 text-sm mb-1">
              <span className="font-semibold">Author:</span> {book?.author}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              <span className="font-semibold">Genre:</span> {book?.genreName}
            </p>
            <p className="text-gray-600 text-sm mb-4">
              <span className="font-semibold">Published:</span>
              {new Date(book?.publishedAt).toLocaleDateString()}
            </p>
          </div>
        )}
        <div className="flex justify-between items-center mt-5">
          <Link
            href={`/bookdetail/${book?.id}`}
            className="hover:bg-primary-800  px-4 py-2 border rounded-full border-primary-800 text-primary-800 hover:text-white transition-colors duration-300"
          >
            Read More
          </Link>
          <button className="text-primary-800">
            <AddFavorite bookId={book?.id} />
          </button>
        </div>
      </div>
    </div>
  );
}
