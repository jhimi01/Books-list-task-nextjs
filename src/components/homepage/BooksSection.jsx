"use client";
import React, { useEffect, useState } from "react";
import SidebarBooks from "./SidebarBooks";
// import books from "../../../public/booklist.json";
import BookCard from "../book/BookCard";
import { Grid2X2, ListFilter, Rows } from "lucide-react";
import Link from "next/link";
import { bookStore } from "@/store/books";

export default function BooksSection() {
  // State to manage the layout (grid or row)
  const [isRowLayout, setIsRowLayout] = useState(false);
    const books = bookStore((state) => state.books);
    const fetchbooks = bookStore((state) => state.fetchbooks);

     useEffect(() => {
        fetchbooks(); // Fetch genres on component mount
      }, [fetchbooks]);
    

  // Function to toggle the layout
  const toggleLayout = () => {
    setIsRowLayout(!isRowLayout);
  };

  return (
    <div className="wrapper my-10 flex gap-5">
      {/* Sidebar */}
      <div className="w-[30%] sticky top-14 h-screen py-3 px-5">
        <h2 className="text-2xl mb-5 font-semibold">Browse</h2>
        <SidebarBooks />
      </div>

      {/* Main Content */}
      <div className="w-full py-3 px-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl capitalize mb-5 font-semibold">All Books</h2>
          <div className="flex gap-2">
            <h3 className="text-sm font-semibold">
              {books?.length} books available
            </h3>
            <ListFilter className="cursor-pointer" />
            <Grid2X2
              className={`cursor-pointer ${
                !isRowLayout ? "text-primary-800" : "text-gray-500"
              }`}
              onClick={() => setIsRowLayout(false)}
            />
            <Rows
              className={`cursor-pointer ${
                isRowLayout ? "text-primary-800" : "text-gray-500"
              }`}
              onClick={toggleLayout}
            />
          </div>
        </div>

        {/* Book Cards */}
        {books?.length > 0 ? (
          <div
            className={`${
              isRowLayout ? "flex flex-col gap-3" : "grid grid-cols-3 gap-6"
            }`}
          >
            {books.map((book, index) => (
              <Link href={`/bookdetail/${book?.id}`} key={index}>
                <BookCard book={book} isRowLayout={isRowLayout} />
              </Link>
            ))}
          </div>
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
}
