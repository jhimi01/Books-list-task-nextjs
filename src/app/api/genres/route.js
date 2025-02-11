import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch genres from the database
    const genres = await prisma.genre.findMany();

    // Return the genres as a JSON response
    return NextResponse.json(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);

    // Return an error response
    return NextResponse.json(
      { error: "Failed to fetch genres" },
      { status: 500 }
    );
  }
}
