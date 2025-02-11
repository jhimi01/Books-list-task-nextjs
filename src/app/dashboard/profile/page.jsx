"use client";
import React, { useEffect } from "react";
import useAuthStore from "@/store/auth";
import { useCookie } from "@/hooks/useCookie";

export default function ProfilePage() {
  const { user, isAuthenticated, fetchLoggedInUser, error } = useAuthStore();
  const { getCookie } = useCookie({ key: "authToken", days: 7 });

  useEffect(() => {
    const token = getCookie(); // Get the token using the custom hook
    if (token) {
      fetchLoggedInUser(token); // Pass the token to the store function
    }
  }, [fetchLoggedInUser]);

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="flex justify-center items-center md:px-0 px-5 py-28 bg-gray-100">
      {isAuthenticated ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-96">
          <div className="flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-[#fcc6bf] flex items-center justify-center text-2xl font-bold text-primary-800">
              {user?.name?.[0].toUpperCase()}
            </div>
          </div>
          <h1 className="text-2xl text-center font-semibold mt-4">
            {user?.name}
          </h1>
          <p className="text-gray-600 text-center">{user?.email}</p>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Account Details</h2>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                <span className="font-medium">ID:</span> {user?.id}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Created At:</span>{" "}
                {new Date(user?.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Updated At:</span>{" "}
                {new Date(user?.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">You are not logged in.</p>
      )}
    </div>
  );
}
