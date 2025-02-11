'use client'
import { bookStore } from "@/store/books";
import { Search } from "lucide-react";
import React, { useState } from "react";

export default function Searchbar() {
    const setSearchQuery = bookStore((state) => state.setSearchQuery);

  return (
    <div className="py-20 bg-gray-200">
      <div className="wrapper flex flex-col items-center justify-center">
        <h2 className="capitalize text-2xl font-semibold mb-3">explore books</h2>
       <div className="flex md:w-[50%] w-full">
        <div className="relative flex-grow">
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            placeholder="search your favorite book..."
            className="px-4 focus:outline-none focus:border-0 py-2 w-full mx-auto"
          />
          <Search className="absolute right-1   text-primary-800 top-2" />
        </div></div>
      </div>
    </div>
  );
}
