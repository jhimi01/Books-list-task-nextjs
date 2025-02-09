import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const genreName = url.searchParams.get("genre");
    const filterType = url.searchParams.get("filter");

    const where = {};
    const orderBy = [];

    if (genreName) {
      where.genreName = genreName;
    }

    if (filterType === "earlier") {
      orderBy.push({ publishedAt: "asc" });
    } else if (filterType === "older") {
      orderBy.push({ publishedAt: "desc" });
    }

    // Fetch books from Prisma based on the constructed query
    const books = await prisma.book.findMany({
      where,
      orderBy,
      include: {
        genre: true, // Include related genre information
      },
    });

    // Return the books as a JSON response
    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);

    // Return an error response
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
