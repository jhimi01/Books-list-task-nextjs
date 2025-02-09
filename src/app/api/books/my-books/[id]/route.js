import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Authorization header missing");

    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("Token missing");
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded?.id;
    if (!userId) throw new Error("Invalid token: User ID is missing");

    const myBooks = await prisma.book.delete({
      where: { userId, id: id },
    });

    return new Response(JSON.stringify(myBooks), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching user books:", error);
    return NextResponse.json(
      { error: "Failed to fetch user books" },
      { status: 500 }
    );
  }
}
