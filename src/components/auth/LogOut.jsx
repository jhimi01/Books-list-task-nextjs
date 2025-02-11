"use client";
import { useCookie } from "@/hooks/useCookie";
import axios from "axios";
import { LogOutIcon } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogOut() {
  const { getCookie, removeCookie } = useCookie({ key: "authToken", days: 7 });
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const authToken = getCookie();

  const handleLogout = async () => {
    try {
      if (!authToken) {
        console.error("No auth token found");
        return;
      }
      setIsLoggingOut(true);
      const response = await axios.delete("/api/auth/login", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.status === 200) {
        removeCookie();
        console.log("Logged out successfully");
        router.replace("/login");
      } else {
        console.error("Failed to log out:", response.statusText);
      }
    } catch (err) {
      console.error("Logout error:", err.message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      type="submit"
      onClick={handleLogout}
      className="flex items-center gap-2"
      disabled={isLoggingOut}
    >
      <LogOutIcon />
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
}
