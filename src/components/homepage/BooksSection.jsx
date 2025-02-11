"use client";
import React, { useEffect, useState } from "react";
import SidebarBooks from "./SidebarBooks";
import BookCard from "../book/BookCard";
import { Grid2X2, ListFilter, Rows } from "lucide-react";
import { bookStore } from "@/store/books";
import FilterButton from "./FilterButton";

export default function BooksSection() {
  const [isRowLayout, setIsRowLayout] = useState(false);

  // Accessing store values
  const books = bookStore((state) => state.books);
  const fetchbooks = bookStore((state) => state.fetchbooks);
  const searchQuery = bookStore((state) => state.searchQuery);

  // Fetch books when the component mounts
  useEffect(() => {
    fetchbooks();
  }, [fetchbooks]);

  // Function to toggle the layout
  const toggleLayout = () => {
    setIsRowLayout(!isRowLayout);
  };

  // Combine search and genre filtering
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="wrapper my-10 md:flex gap-5">
      {/* Sidebar */}
      <div className="md:w-[30%] md:sticky top-14 md:h-screen py-3 px-5">
        <h2 className="text-2xl mb-5 font-semibold">Browse</h2>
        <SidebarBooks />
      </div>

      {/* Main Content */}
      <div className="w-full py-3 px-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl capitalize mb-5 font-semibold">All Books</h2>
          <div className="flex gap-3">
            <h3 className="text-sm font-semibold">
              {filteredBooks?.length} books available
            </h3>
            <FilterButton />
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

        {/* Books Section */}
        {!filteredBooks || filteredBooks.length === 0 ? (
          <p className="text-center font-semibold py-5 capitalize text-gray-600">
            No books available
          </p>
        ) : (
          <ul
            className={`grid ${
              isRowLayout
                ? "grid-cols-1 gap-4"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            }`}
          >
            {filteredBooks.map((book, index) => (
              <BookCard book={book} key={index} isRowLayout={isRowLayout} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
