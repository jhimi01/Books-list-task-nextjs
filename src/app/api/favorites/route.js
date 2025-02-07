import prisma from "@/lib/prisma"; // Assuming you have a Prisma client setup
import { auth } from "@/auth";

export async function POST(req) {
    const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { bookId } = await req.json();

  try {
    const existingFavorite = await prisma.favoriteBook.findFirst({
      where: {
        userId: session.user.id,
        //   bookId: bookId,
      },
    });
    if (existingFavorite) {
      return new Response(
        JSON.stringify({ error: "Book is already in favorites" }),
        { status: 400 }
      );
    }

    const favorite = await prisma.favoriteBook.create({
      data: {
        userId: session.user.id, // Assuming `session.user.id` contains the logged-in user ID
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

export async function GET() {
  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    // Fetch the user's favorite books
    const favoriteBooks = await prisma.favoriteBook.findMany({
      where: {
        userId: session.user.id,
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


