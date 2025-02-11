"use client";
import { useFavoritesStore } from "@/store/favorites";
import React, { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { HeartOff } from "lucide-react";
import { useCookie } from "@/hooks/useCookie";

export default function FavoriteTable() {
  const { favorites, loading, error, fetchFavorites } = useFavoritesStore();
  const [loadingId, setLoadingId] = useState(null);
  const { getCookie } = useCookie({ key: "authToken", days: 7 });
  const authToken = getCookie();

  const handleRemoveFavorite = async (id) => {
    setLoadingId(id);
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || "Failed to remove from favorites.");
        return;
      }

      toast.success("Removed from favorites!");
      fetchFavorites(authToken);
    } catch (err) {
      console.error("Error:", err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchFavorites(authToken);
    }
  }, [authToken, fetchFavorites]);

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
                    src={favorite.book.coverImage || "/placeholder.png"}
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
                    disabled={loadingId === favorite?.id}
                  >
                    {loadingId === favorite?.id ? (
                      "Removing..."
                    ) : (
                      <HeartOff size={25} />
                    )}
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
