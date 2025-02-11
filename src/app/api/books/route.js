import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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
// book added
export async function POST(req) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Authorization header missing");

    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("Token missing");
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded?.id;
    if (!userId) throw new Error("Invalid token: User ID is missing");

    const body = await req.json();
    console.log("Request body---------:", body);
    if (!body || Object.keys(body).length === 0)
      throw new Error("Request body is empty");

    const { title, author, coverImage, genreName, publishedAt } = body;
    if (!title || !author || !coverImage || !publishedAt) {
      throw new Error(
        "Missing required fields: title, author, coverImage, or publishedAt"
      );
    }

    const genre = await prisma.genre.findUnique({ where: { name: genreName } });
    if (!genre) throw new Error("Genre not found");

    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        coverImage,
        genreName: genre.name,
        publishedAt: new Date(publishedAt),
        userId,
      },
    });

    console.log("new book:", newBook);

    return new Response(JSON.stringify(newBook), { status: 201 });
  } catch (error) {
    console.error("Error in POST handler:", error); // Log the exact error
    return new Response(
      JSON.stringify({ error: error.message || "Something went wrong." }),
      { status: 500 }
    );
  }
}
