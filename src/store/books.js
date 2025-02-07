import { create } from "zustand";
import axios from "axios";

export const bookStore = create((set) => ({
  books: [],
  book: null, 
  fetchbooks: async () => {
    try {
      const response = await axios.get("/api/books");
      set({ books: response.data });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  },
  fetchBookById: async (id) => {
    try {
      const response = await axios.get(`/api/books/${id}`);
      set({ book: response.data });
    } catch (error) {
      console.error(`Error fetching book with id ${id}:`, error);
    }
  },
}));
