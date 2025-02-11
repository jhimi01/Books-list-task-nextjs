"use client";
import React from "react";
import { bookStore } from "@/store/books";
import { ListFilter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

export default function FilterButton() {
  const fetchbooks = bookStore((state) => state.fetchbooks);
  const selectedGenre = bookStore((state) => state.selectedGenre);

  const handleFilter = async (filterType) => {
    try {
      await fetchbooks(selectedGenre, filterType);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-0 focus:border-0">
          <ListFilter className="cursor-pointer text-2xl" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleFilter("earlier")}>
          Published Earlier
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem onClick={() => handleFilter("older")}>
          Published Older
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
