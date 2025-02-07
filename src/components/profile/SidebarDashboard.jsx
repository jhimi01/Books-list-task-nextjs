"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogOut from "@/components/auth/LogOut";
import {
  LayoutDashboard,
  Settings,
  HomeIcon,
  Heart,
  Book,
  Menu,
  X,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function SidebarDashboard() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // Toggle state for the sidebar

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/favorite-book-list", label: "Favorite", icon: Heart },
    { href: "/book-list", label: "Book List", icon: Book },
  ];

  return (
    <>
      {/* Toggle Button for Small Screens */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary-800 text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "" : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed z-40 h-screen bg-primary-800 text-white flex flex-col w-64 lg:w-64 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:static lg:h-screen lg:flex`}
      >
        {/* Sidebar Header */}
        <div className="text-center py-2 border-b bg-primary-800">
          <h1 className="text-2xl font-semibold text-white">Admin Panel</h1>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center p-2 text-base font-medium rounded-lg transition-colors ${
                    pathname === href
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="px-4 py-6 border-t">
          <ul className="space-y-2">
            <li>
              <Link
                href={"/"}
                className={`flex items-center p-2 text-base font-medium rounded-lg transition-colors ${
                  pathname === "/"
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <HomeIcon className="w-5 h-5 mr-3" />
                home
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className={`flex items-center p-2 text-base font-medium rounded-lg transition-colors ${
                  pathname === "/setting"
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Settings className="w-5 h-5 mr-3" />
                setting
              </Link>
            </li>
            <Separator className="my-2" />
            <li className="w-full flex items-center justify-start p-2 text-base font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
              <LogOut />
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay for Small Screens */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
