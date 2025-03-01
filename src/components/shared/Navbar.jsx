"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogOut from "../auth/LogOut";
import { useCookie } from "@/hooks/useCookie";
import { LibraryBig, User } from "lucide-react";

export default function Navbar() {
  const [isHydrated, setIsHydrated] = useState(false);
  const pathname = usePathname();
  const shouldHideNavbar = [
    "/dashboard/book-list",
    "/dashboard/favorite-book-list",
    "/dashboard",
    "/dashboard/profile",
    "/dashboard/add-book",
    "/dashboard/my-books",
  ].includes(pathname);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCookie } = useCookie({ key: "authToken", days: 7 });
  const authToken = getCookie();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  // Helper function to check if a link is active
  const isActive = (link) =>
    pathname === link
      ? "text-primary-800 md:text-primary-800 font-bold"
      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-800";

  return (
    <nav
      className={`${
        shouldHideNavbar
          ? "hidden"
          : "bg-white sticky w-full z-20 top-0 start-0 border-b border-gray-200 shadow-lg"
      }`}
    >
      <div className="wrapper flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3">
          <span className="flex items-center text-primary-800 md:ml-0 ml-3">
            <LibraryBig />{" "}
            <span className="text-xl hidden md:block">BookLsit</span>
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0">
          <div>
            {authToken === null ? (
              <span>Loading...</span>
            ) : authToken ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="text-white rounded-full bg-primary-800 hover:bg-primary-700 font-medium text-sm p-1 text-center"
                >
                  <User className="w-7 h-7" />
                </Link>
                <LogOut />
              </div>
            ) : (
              <Link
                href="/login"
                className="text-white bg-primary-800 hover:bg-primary-700 font-medium text-sm px-4 py-2 text-center"
              >
                Login
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? "max-h-96" : "max-h-0"
          } overflow-hidden transition-all duration-300 ease-in-out items-center w-full md:flex md:max-h-none md:overflow-visible md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                href="/"
                className={`block py-2 px-3 rounded-sm md:bg-transparent md:p-0 ${isActive(
                  "/"
                )}`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block py-2 px-3 rounded-sm md:p-0 ${isActive(
                  "/about"
                )}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/service"
                className={`block py-2 px-3 rounded-sm md:p-0 ${isActive(
                  "/service"
                )}`}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`block py-2 px-3 rounded-sm md:p-0 ${isActive(
                  "/contact"
                )}`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
