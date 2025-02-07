import { create } from "zustand";
import axios from "axios";

export const bookStore = create((set) => ({
  books: [],
  fetchbooks: async () => {
    try {
      const response = await axios.get("/api/books");
      set({ books: response.data });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  },
}));
