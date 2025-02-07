'use client';
import { Heart } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddFavorite({ bookId }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddFavorite = async () => {
    try {
      const response = await axios.post("/api/favorites", { bookId });

      if (response) {
        setIsFavorite(true); // Mark the book as favorite
        toast.success("Book added to favorites!");
      } else {
        console.error("Failed to add favorite:", response.data);
        toast.error("Failed to add book to favorites.");
      }
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.warn(error.response.data.error);
    }
  };

  return (
    <button onClick={handleAddFavorite} disabled={isFavorite}>
      <Heart
        className={`cursor-pointer ${isFavorite ? "text-red-500" : "text-gray-500"}`}
        size={24}
      />
    </button>
  );
}
