"use client";
import { genreStore } from "@/store/genre";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AddBookForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const genres = genreStore((state) => state.genres);
  const fetchGenres = genreStore((state) => state.fetchGenres);
  useEffect(() => {
    fetchGenres(); // Fetch genres on component mount
  }, [fetchGenres]);
  console.log(genres);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      alert("Book added successfully!");
      reset();
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the book.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border  shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Add a New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border focus:outline-none  "
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="author">
            Author
          </label>
          <input
            type="text"
            id="author"
            {...register("author", { required: "Author is required" })}
            className="w-full p-2 border focus:outline-none  "
          />
          {errors.author && (
            <p className="text-red-500 text-sm">{errors.author.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="coverImage">
            Cover Image URL
          </label>
          <input
            type="url"
            id="coverImage"
            {...register("coverImage", {
              required: "Cover image URL is required",
            })}
            className="w-full p-2 border focus:outline-none  "
          />
          {errors.coverImage && (
            <p className="text-red-500 text-sm">{errors.coverImage.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="genreName">
            Genre
          </label>
          <select
            id="genreName"
            {...register("genreName", { required: "Genre is required" })}
            className="w-full p-2 border focus:outline-none  "
          >
            <option value="">Select a genre</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre.name}>
                {genre?.name}
              </option>
            ))}
          </select>
          {errors.genreName && (
            <p className="text-red-500 text-sm">{errors.genreName.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="publishedAt">
            Published At
          </label>
          <input
            type="date"
            id="publishedAt"
            {...register("publishedAt", {
              required: "Published date is required",
            })}
            className="w-full p-2 border focus:outline-none  "
          />
          {errors.publishedAt && (
            <p className="text-red-500 text-sm">{errors.publishedAt.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-primary-800 text-white p-2  hover:bg-primary-700"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
