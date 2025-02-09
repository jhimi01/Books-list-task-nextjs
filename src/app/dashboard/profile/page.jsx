'use client';

import React, { useEffect } from "react";
import useAuthStore from "@/store/auth";
import { useCookie } from "@/hooks/useCookie";

export default function ProfilePage() {
  const { user, isAuthenticated, fetchLoggedInUser, error } = useAuthStore();
  const { getCookie } = useCookie({ key: "authToken", days: 7 });
//   const token = getCookie()

  useEffect(() => {
    const token = getCookie(); // Get the token using the custom hook
    if (token) {
      fetchLoggedInUser(token); // Pass the token to the store function
    }
  }, [fetchLoggedInUser]);

  console.log("user", user);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Profile Page</h1>
      {isAuthenticated ? (
        <p>Welcome, {user?.name}</p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}
