import prisma from "@/lib/prisma"; // Assuming you have a Prisma client setup
import jwt from "jsonwebtoken";

export async function POST(req) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) throw new Error("Authorization header missing");

  const token = authHeader.split(" ")[1];
  if (!token) throw new Error("Token missing");

  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT secret key is missing");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userId = decoded?.id; // Ensure id exists in decoded token

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { bookId } = await req.json();

  try {
    const existingFavorite = await prisma.favoriteBook.findFirst({
      where: {
        userId,
        bookId: bookId,
      },
    });
    if (existingFavorite) {
      return new Response(
        JSON.stringify({ error: "Book is already in favorites" }),
        // { status: 401 }
      );
    }

    const favorite = await prisma.favoriteBook.create({
      data: {
        userId, // Assuming `session.user.id` contains the logged-in user ID
        bookId,
      },
    });

    return new Response(JSON.stringify(favorite), { status: 201 });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return new Response(
      JSON.stringify({ error: "Error adding to favorites" }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) throw new Error("Authorization header missing");

  const token = authHeader.split(" ")[1];
  if (!token) throw new Error("Token missing");

  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT secret key is missing");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userId = decoded?.id; // Ensure id exists in decoded token

  if (!token) {
    return new Response(
      JSON.stringify({ error: "Missing authentication token" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    // Fetch the user's favorite books
    const favoriteBooks = await prisma.favoriteBook.findMany({
      where: {
        userId,
      },
      include: {
        book: true, // Assuming you have a relation with the `book` model for additional details
      },
    });

    return new Response(JSON.stringify(favoriteBooks), { status: 200 });
  } catch (error) {
    console.error("Error fetching favorite books:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching favorite books" }),
      { status: 500 }
    );
  }
}
