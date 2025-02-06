"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="wrapper md:flex gap-5 md:space-y-0 space-y-5 items-center md:h-[70vh]">
      <div className="text-gray-800 md:w-1/2 space-y-3">
        <p>ERROR CODE: 404</p>
        <h2 className="text-7xl font-semibold">OOOPS!!</h2>
        <h4 className="text-4xl font-thin">
          This is not the page you are looking for
        </h4>
        <p className="text-xl">Here are some helpful link instead:</p>
        <div className="space-x-3 pt-6">
          <Link
            href="/"
            className="border border-gray-800 px-4 py-1 hover:bg-gray-800 duration-300 hover:text-white"
          >
            Home
          </Link>
          <button
            onClick={() => router.back()}
            className="border border-gray-800 px-4 py-[3px] hover:bg-gray-800 duration-300 hover:text-white"
          >
            Back
          </button>
        </div>
      </div>
      <div className="md:w-1/2">
        <Image src="/404.png" alt="404" width={1000} height={1000} />
      </div>
    </div>
  );
}