"use client";
import { genreStore } from "@/store/genre";
import { bookStore } from "@/store/books";
import { useEffect, useState } from "react";

export default function SidebarBooks() {
  const genres = genreStore((state) => state.genres);

  console.log('genres', genres)
  const fetchGenres = genreStore((state) => state.fetchGenres);
  const fetchbooks = bookStore((state) => state.fetchbooks);

  // State to track the selected genre
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    fetchGenres(); // Fetch genres on component mount
  }, [fetchGenres]);

  // const handleGenreClick = (genreName) => {
  //   setSelectedGenre(genreName); // Update the selected genre
  //   fetchbooks(genreName); // Fetch books for the selected genre
  // };

  const handleGenreSelect = async (genre) => {
    setSelectedGenre(genre); // Update the selected genre in the store
    await fetchbooks(genre); // Fetch books based on selected genre
  };

  return (
    <div className="w-full bg-gray-100">
      <h2 className="text-2xl font-semibold text-center py-2">Genre</h2>
      {!genres || genres.length === 0 ? (
        <p className="text-center font-semibold py-5 capitalize text-gray-600">
          Not found
        </p>
      ) : (
        <ul className="flex md:flex-col w-full flex-row overflow-x-auto">
          {/* "All" button */}
          <li>
            <button
              className={`w-full font-semibold text-start px-4 py-2 duration-200 ${
                selectedGenre === null
                  ? "bg-primary-800 text-white"
                  : "text-gray-600 hover:bg-primary-700 hover:text-white"
              }`}
              onClick={() => handleGenreSelect(null)} // Fetch all books
            >
              All
            </button>
          </li>

          {/* Genre buttons */}
          {genres.map((genre) => (
            <li key={genre.id}>
              <button
                className={`w-full font-semibold text-start px-4 py-2 duration-200 ${
                  selectedGenre === genre.name
                    ? "bg-primary-800 text-white"
                    : "text-gray-600 hover:bg-primary-700 hover:text-white"
                }`}
                onClick={() => handleGenreSelect(genre.name)}
              >
                {genre.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
