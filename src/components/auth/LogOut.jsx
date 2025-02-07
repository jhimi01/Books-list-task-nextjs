"use client";
import { useCookie } from "@/hooks/useCookie";
import axios from "axios";
import { LogOutIcon } from "lucide-react";
import React from "react";

export default function LogOut() {
  const { getCookie, removeCookie } = useCookie({ key: "authToken", days: 7 });
  const authToken = getCookie();
  const handleLogout = async () => {
    try {
      if (!authToken) {
        console.error("No auth token found");
        return;
      }
      const response = await axios.delete("/api/auth/login", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.status === 200) {
        removeCookie();
        console.log("Logged out successfully");
      }
      console.log(response);
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };
  
  return (
    <button
      type="submit"
      onClick={handleLogout}
      className="flex items-center gap-4"
    >
      <LogOutIcon /> Logout
    </button>
  );
}
