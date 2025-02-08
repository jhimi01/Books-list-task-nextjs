import { create } from "zustand";
import axios from "axios";

export const bookStore = create((set, get) => ({
  books: [],
  selectedGenre: null, // State for the selected genre
  searchQuery: "", // State for search query

  setSelectedGenre: (genre) => set({ selectedGenre: genre }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  fetchbooks: async (genre = null) => {
    try {
      const endpoint = genre
        ? `/api/books?genre=${encodeURIComponent(genre)}`
        : `/api/books`;
      const response = await fetch(endpoint);
      const data = await response.json();

      set({ books: data });
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  },
}));