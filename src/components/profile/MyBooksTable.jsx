"use client";
import { useCookie } from "@/hooks/useCookie";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
} from "../ui/table";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import Link from "next/link";

export default function MyBooksTable() {
  const { getCookie } = useCookie({ key: "authToken", days: 7 });
  const authToken = getCookie();

  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    const fetchMyBooks = async () => {
      if (!authToken) {
        console.error("No auth token found");
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get("/api/books/my-books", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setMyBooks(response.data);
      } catch (err) {
        console.error("Error fetching my books:", err);
        setError(err.message || "Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooks();
  }, [authToken]);

  const handleRemoveBook = async (bookId) => {
    if (!authToken) return;
    setLoadingId(bookId);

    try {
      await axios.delete(`/api/books/my-books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setMyBooks((prev) => prev.filter((book) => book.id !== bookId));
    } catch (err) {
      console.error("Error removing book:", err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Books</h1>
        {loading && <p>Loading your books...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && myBooks.length > 0 ? (
          <Table className="w-full">
            <TableCaption>A list of your uploaded books</TableCaption>
            <TableHeader className="bg-primary-800">
              <TableRow>
                <TableHead className="text-white"></TableHead>
                <TableHead className="text-white">Title</TableHead>
                <TableHead className="text-white">Author</TableHead>
                <TableHead className="text-white">Published</TableHead>
                <TableHead className="text-white">Created</TableHead>
                <TableHead className="text-white">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {myBooks.map((book) => (
                <TableRow key={book.id} className="hover:bg-gray-200">
                  <TableCell>
                    <Link href={`/bookdetail/${book.id}`}>
                      {" "}
                      <Image
                        alt="cover"
                        src={book.coverImage || "/placeholder.png"}
                        width={500}
                        height={500}
                        className="w-14 h-14"
                      />
                    </Link>
                  </TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>
                    <span className="bg-gray-200 rounded-full p-1">
                      {new Date(book.publishedAt).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(book.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <button
                      className="text-primary-800"
                      onClick={() => handleRemoveBook(book.id)}
                      disabled={loadingId === book.id}
                    >
                      {loadingId === book.id ? (
                        "Removing..."
                      ) : (
                        <Trash2 size={25} />
                      )}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}
