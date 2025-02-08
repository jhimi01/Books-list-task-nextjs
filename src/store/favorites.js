import { create } from "zustand";

export const useFavoritesStore = create((set) => ({
  favorites: [], // Array to store favorite books
  loading: false, // Loading state
  error: null, // Error state

  fetchFavorites: async (authToken) => {
    if (!authToken) {
      set({ error: "Missing auth token", loading: false });
      return;
    }
  
    set({ loading: true, error: null });
  
    try {
      const response = await fetch("/api/favorites", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch favorites");
      }
  
      const data = await response.json();
      set({ favorites: data, loading: false });
    } catch (error) {
      console.error("Error fetching favorites:", error);
      set({ error: error.message, loading: false });
    }
  },
  

  clearFavorites: () => {
    set({ favorites: [] }); // Clear the favorites array
  },
}));
