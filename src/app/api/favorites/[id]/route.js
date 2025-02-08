import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";


export async function DELETE(req, { params }) {
  // const session = await auth();

  // console.log("params", session)

  // if (!session) {
  //   return new Response(
  //     JSON.stringify({ error: "Unauthorized" }),
  //     { status: 401, headers: { "Content-Type": "application/json" } }
  //   );
  // }

  const { id } = await params;

  try {
    const deletedFavorite = await prisma.favoriteBook.delete({
      where: { id: id },
    });

    return new Response(
      JSON.stringify(deletedFavorite),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting favorite:", error);
    return new Response(
      JSON.stringify({ error: "Error deleting favorite" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}