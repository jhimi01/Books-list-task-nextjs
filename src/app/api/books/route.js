import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // Fetch genres from the database
//     const books = await prisma.book.findMany();

//     // Return the genres as a JSON response
//     return NextResponse.json(books);
//   } catch (error) {
//     console.error("Error fetching genres:", error);

//     // Return an error response
//     return NextResponse.json(
//       { error: "Failed to fetch genres" },
//       { status: 500 }
//     );
//   }
// }


export async function GET(req) {
  try {
    const url = new URL(req.url);
    const genreName = url.searchParams.get('genre');

    let books;
    if (genreName) {
      // Fetch books by the specified genre
      books = await prisma.book.findMany({
        where: {
          genreName: genreName,
        },
        include: {
          genre: true, // Optional: Include genre details
        },
      });
    } else {
      // Fetch all books if no genre is specified
      books = await prisma.book.findMany({
        include: {
          genre: true,
        },
      });
    }

    // Return the books as a JSON response
    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);

    // Return an error response
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}

export async function postBook(req) {}

export async function updatetBook(req) {}

export async function deletetBook(req) {}
