"use client";

import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,

  // Fetch the logged-in user
  fetchLoggedInUser: async (token) => {
    try {
      if (!token) throw new Error("Token not found. Please log in.");

      const response = await axios.get("/api/auth/login", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        set({
          user: response.data.userData,
          isAuthenticated: true,
          error: null,
        });
      } else {
        throw new Error(
          `Failed to retrieve user data. Status code: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error fetching logged-in user data:", error.message);
      set({
        user: null,
        isAuthenticated: false,
        error: error.message,
      });
    }
  },
}));

export default useAuthStore;
