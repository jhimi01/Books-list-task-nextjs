import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// signle value
export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const book = await prisma.book.findUnique({
      where: {
        id: id,
      },
      include: {
        genre: true,
      },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // Return the book as a JSON response
    return NextResponse.json(book);
  } catch (error) {
    console.error("Error fetching the book:", error);

    // Return an error response
    return NextResponse.json(
      { error: "Failed to fetch the book" },
      { status: 500 }
    );
  }
}
