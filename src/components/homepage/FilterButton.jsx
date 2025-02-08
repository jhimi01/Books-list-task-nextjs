import {
  BookCheck,
  Edit,
  ListFilter,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function FilterButton() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="focus:outline-0 focus:border-0">
            <ListFilter className="cursor-pointer text-2xl" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <BookCheck /> Published Earlier
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem className="text-primary-800">
            <BookCheck /> Published Older
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
