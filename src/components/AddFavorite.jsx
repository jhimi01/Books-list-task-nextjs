"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookie } from "@/hooks/useCookie";

export default function AddFavorite({ bookId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { getCookie } = useCookie({ key: "authToken", days: 7 });
  const authToken = getCookie();

  const handleAddFavorite = async () => {
    try {
      const response = await axios.post(
        "/api/favorites",
        { bookId }, // Data to send in the request body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setIsFavorite(true); // Mark the book as favorite
      toast.success("Book added to favorites!");
    } catch (error) {
      console.error("Error:", error.response?.data?.error || error.message);
      toast.warn(error.response?.data?.error || "Failed to add book to favorites.");
    }
  };

  return (
    <div onClick={handleAddFavorite} disabled={isFavorite}>
      <Heart
        className={`cursor-pointer ${isFavorite ? "text-red-500" : "text-gray-500"}`}
        size={24}
      />
    </div>
  );
}
