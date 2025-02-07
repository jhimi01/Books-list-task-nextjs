"use client";
import { genreStore } from "@/store/genre";
import { useEffect } from "react";

export default function SidebarBooks() {
  const genres = genreStore((state) => state.genres);
  const fetchGenres = genreStore((state) => state.fetchGenres);

  useEffect(() => {
    fetchGenres(); // Fetch genres on component mount
  }, [fetchGenres]);

  return (
    <div className="w-full bg-gray-100">
      <h2 className=" text-2xl font-semibold text-center py-2">Genere</h2>
      {!genres || genres.length === 0 ? (
        <p className="text-center font-semibold py-5 capitalize text-gray-600">
          not found
        </p>
      ) : (
        <ul className="flex md:flex-col w-full flex-row overflow-x-auto">
          {genres.map((genre) => (
            <li key={genre.id}>
              <button className="w-full font-semibold  text-start text-gray-600 px-4 py-2 duration-200 hover:bg-primary-700">
                {genre.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
