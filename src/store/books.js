import { create } from "zustand";
import axios from "axios";

export const bookStore = create((set, get) => ({
  books: [],
  selectedGenre: null, // State for the selected genre
  searchQuery: "", // State for search query

  setSelectedGenre: (genre) => set({ selectedGenre: genre }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  fetchBookById: async (id) => {
    try {
      const response = await axios.get(`/api/books/${id}`);
      set({ book: response.data });
    } catch (error) {
      console.error(`Error fetching book with id ${id}:`, error);
    }
  },

  // -----------genre type
  // fetchbooks: async (genre = null) => {
  //   try {
  //     const endpoint = genre
  //       ? `/api/books?genre=${encodeURIComponent(genre)}`
  //       : `/api/books`;
  //     const response = await fetch(endpoint);
  //     const data = await response.json();

  //     set({ books: data });
  //   } catch (error) {
  //     console.error("Failed to fetch books:", error);
  //   }
  // },

  // ----------filter type
//   fetchbooks: async (filterType = null) => {
//   try {
//     const endpoint = filterType
//       ? `/api/books?filter=${encodeURIComponent(filterType)}`
//       : `/api/books`;
//     const response = await fetch(endpoint);
//     const data = await response.json();

//     set({ books: data });
//   } catch (error) {
//     console.error("Failed to fetch books:", error);
//   }
// },


fetchbooks: async (genre = null, filterType = null) => {
  try {
    // Build the query string dynamically based on provided filters
    const queryParams = new URLSearchParams();

    if (genre) queryParams.append("genre", genre);
    if (filterType) queryParams.append("filter", filterType);

    const endpoint = `/api/books?${queryParams.toString()}`;
    const response = await fetch(endpoint);
    const data = await response.json();

    // Update the state with the fetched books
    set({ books: data });
  } catch (error) {
    console.error("Failed to fetch books:", error);
  }
},

}));


