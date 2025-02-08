'use client'
import { bookStore } from "@/store/books";
import { genreStore } from "@/store/genre";
import { Search } from "lucide-react";
import React, { useState } from "react";

export default function Searchbar() {
    const [selectedGenre, setSelectedGenre] = useState("");
    // const genres = genreStore((state) => state.genres);
    const setSearchQuery = bookStore((state) => state.setSearchQuery);
    const genres = [
        "All Genres",
        "Classic",
        "Fiction",
        "Dystopian",
        "Romance",
        "Fantasy",
        "Adventure",
        "Philosophy",
        "Post-Apocalyptic",
      ];

  return (
    <div className="py-20 bg-gray-200">
      <div className="wrapper flex flex-col items-center justify-center">
        <h2 className="capitalize text-2xl font-semibold mb-3">explore books</h2>
       <div className="flex md:w-[50%]">
         {/* Genre Dropdown */}
         {/* <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-3 py-2 focus:outline-0 border-r bg-white"
          >
            {genres.map((genre, index) => (
              <option className="hover:bg-primary-800" key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select> */}
        <div className="relative flex-grow">
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            placeholder="search your favorite book..."
            className="px-4 focus:outline-none focus:border-0 py-2 w-full mx-auto"
          />
          <Search className="absolute right-1   text-primary-800 top-2" />
        </div></div>
      </div>
    </div>
  );
}
