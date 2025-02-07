import { create } from "zustand";
import axios from "axios";

export const genreStore = create((set) => ({
  genres: [],
  fetchGenres: async () => {
    try {
      const response = await axios.get("/api/genres");
      set({ genres: response.data });
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  },
}));
