"use client";
import { useFavoritesStore } from "@/store/favorites";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Assuming you have a Shadcn button component
import { toast } from "react-toastify";
import { HeartOff } from "lucide-react";

export default function FavoriteTable() {
  const { favorites, loading, error, fetchFavorites } = useFavoritesStore();

  const handleRemoveFavorite = async (id) => {
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: "DELETE",
      });
  
    //   const contentType = response.headers.get("content-type");
  
      if (!response.ok) {
        // const error = contentType?.includes("application/json")
        //   ? await response.json()
        //   : { error: "Unexpected error occurred" };
        console.error("Failed to remove favorite:", error);
        toast.error(error.error || "Failed to remove from favorites.");
        return;
      }
  
      toast.success("Removed from favorites!");
      fetchFavorites(); // Refresh the favorites list
    } catch (err) {
      console.error("Error:", err);
      toast.error("An error occurred. Please try again.");
    }
  };
  

  useEffect(() => {
    fetchFavorites(); // Fetch the favorite books on component mount
  }, [fetchFavorites]);

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Favorite Books</h1>
      {favorites.length > 0 ? (
        <Table className="w-full">
          <TableCaption>A list of your favorite books</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {favorites.map((favorite) => (
              <TableRow key={favorite.id}>
                <TableCell>
                  <Image
                    alt="cover"
                    src={favorite.book.coverImage}
                    width={500}
                    height={500}
                    className="w-14 h-14"
                  />
                </TableCell>
                <TableCell>{favorite.book.title}</TableCell>
                <TableCell>{favorite.book.author}</TableCell>
                <TableCell>
                  {new Date(favorite.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <button
                  className="text-primary-800"
                    onClick={() => handleRemoveFavorite(favorite?.id)}
                  >
                    <HeartOff size={25} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No favorite books found.</p>
      )}
    </div>
  );
}
