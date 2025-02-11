"use client";
import { useCookie } from "@/hooks/useCookie";
import { genreStore } from "@/store/genre";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AddBookForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const genres = genreStore((state) => state.genres);
  const fetchGenres = genreStore((state) => state.fetchGenres);
  const { getCookie } = useCookie({ key: "authToken", days: 7 });
  const [uploading, setUploading] = useState(false);
  const [imgUrl, setImgurl] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  console.log(imgUrl);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  const handleImageUpload = async (file) => {
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pskbaxbg");
    formData.append("cloud_name", "dudkmza2y");

    try {
      setIsUploadingImage(true);
      setUploading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dudkmza2y/image/upload",
        formData
      );

      console.log(response);
      setImgurl(response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please try again.");
      return null;
    } finally {
      setIsUploadingImage(false);
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl = imgUrl;
      if (!imgUrl && data.coverImage[0]) {
        imageUrl = await handleImageUpload(data.coverImage[0]);
        if (!imageUrl) return;
      }

      const token = getCookie();
      const response = await axios.post(
        "/api/books",
        { ...data, coverImage: imageUrl },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Book added successfully!");
        reset();
        setImgurl("");
        router.push("/dashboard/my-books");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border shadow-lg">
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
            className="w-full p-2 border focus:outline-none"
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
            className="w-full p-2 border focus:outline-none"
          />
          {errors.author && (
            <p className="text-red-500 text-sm">{errors.author.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="author">
            Book Cover
          </label>
          <label
            className="block mb-1 py-5 font-medium border text-center cursor-pointer"
            htmlFor="coverImage"
          >
            {isUploadingImage ? (
              <div className="flex justify-center items-center">
                <Loader className="animate-spin" />
              </div>
            ) : imgUrl ? (
              <img
                src={imgUrl}
                alt="Uploaded cover"
                className="max-h-32 mx-auto mb-2"
              />
            ) : (
              <span>Click to select an image</span>
            )}
            <input
              type="file"
              id="coverImage"
              {...register("coverImage", {
                required: "Cover image is required",
              })}
              className="hidden"
              accept="image/*"
              onChange={async (e) => {
                if (e.target.files?.[0]) {
                  const file = e.target.files[0];
                  const uploadedUrl = await handleImageUpload(file);
                  if (uploadedUrl) setImgurl(uploadedUrl); // Update image URL
                } else {
                  alert("Please select a valid image file.");
                }
              }}
            />
          </label>

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
            className="w-full p-2 border focus:outline-none"
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
            className="w-full p-2 border focus:outline-none"
          />
          {errors.publishedAt && (
            <p className="text-red-500 text-sm">{errors.publishedAt.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-primary-800 text-white p-2 hover:bg-primary-700"
          disabled={uploading || isUploadingImage}
        >
          {uploading || isUploadingImage ? "Uploading..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}
