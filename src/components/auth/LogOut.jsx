"use client";
import { useCookie } from "@/hooks/useCookie";
import axios from "axios";
import { LogOutIcon } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation

export default function LogOut() {
  const { getCookie, removeCookie } = useCookie({ key: "authToken", days: 7 });
  const [isLoggingOut, setIsLoggingOut] = useState(false); // State for immediate feedback
  const router = useRouter(); // Next.js router
  const authToken = getCookie();

  const handleLogout = async () => {
    try {
      if (!authToken) {
        console.error("No auth token found");
        return;
      }
      setIsLoggingOut(true); // Update UI to reflect logout process
      const response = await axios.delete("/api/auth/login", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.status === 200) {
        removeCookie(); // Remove the token
        console.log("Logged out successfully");
        router.replace("/login"); // Redirect to login page
      } else {
        console.error("Failed to log out:", response.statusText);
      }
    } catch (err) {
      console.error("Logout error:", err.message);
    } finally {
      setIsLoggingOut(false); // Reset logout state
    }
  };

  return (
    <button
      type="submit"
      onClick={handleLogout}
      className="flex items-center gap-4"
      disabled={isLoggingOut} // Disable button while logging out
    >
      <LogOutIcon />
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
}
