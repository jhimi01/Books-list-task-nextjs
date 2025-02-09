"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogOut from "@/components/auth/LogOut";
import {
  LayoutDashboard,
  HomeIcon,
  Heart,
  Menu,
  CircleUser,
  BookCheckIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import useAuthStore from "@/store/auth";
import { useCookie } from "@/hooks/useCookie";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function SidebarDashboard() {
  const pathname = usePathname();
  const { user, fetchLoggedInUser } = useAuthStore();
  console.log("user", user);
  const { getCookie } = useCookie({ key: "authToken", days: 7 });

  useEffect(() => {
    const token = getCookie();
    if (token) {
      fetchLoggedInUser(token);
    }
  }, [fetchLoggedInUser]);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/favorite-book-list", label: "Favorite", icon: Heart },
    { href: "/dashboard/book-list", label: "Book List", icon: BookCheckIcon },
  ];

  return (
    <>
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
        {/* <div className="text-center py-2 border-b bg-primary-800">
          <h1 className="text-2xl font-semibold text-white">Admin Panel</h1>
        </div> */}

        {/* Sidebar Header */}
        <div className="text-center py-5 border-b bg-primary-800">
          <h1 className="text-2xl font-semibold text-white">
            {user?.name}
          </h1>
          <h3 className="text-lg font-semibold text-white">
            {user?.email}
          </h3>
        </div>

        <Tabs defaultValue="guest" className="w-full h-full mt-5 rounded-none">
          <TabsList className="w-full rounded-none">
            <TabsTrigger className="w-full rounded-none" value="guest">
              Guest
            </TabsTrigger>
            <TabsTrigger className="w-full rounded-none" value="host">
              Host
            </TabsTrigger>
          </TabsList>
          <TabsContent value="guest">
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
                      <Icon className="mr-3" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </TabsContent>
          <TabsContent value="host">
            <nav className="flex-1 px-4 py-6">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/dashboard/add-book"
                    className={`flex items-center p-2 text-base font-medium rounded-lg transition-colors ${
                      pathname === "/dashboard/add-book"
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <BookCheckIcon className="mr-3" />
                    Add Books
                  </Link>
                </li>
              </ul>
            </nav>
          </TabsContent>
        </Tabs>

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
                <HomeIcon className="mr-3" />
                home
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/profile"}
                className={`flex items-center p-2 text-base font-medium rounded-lg transition-colors ${
                  pathname === "/dashboard/profile"
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <CircleUser className="mr-3" /> profile
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
