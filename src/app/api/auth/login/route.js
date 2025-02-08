import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "7d",
    });

    // Check if a LoggedInUser record already exists
    let loggedInUser = await prisma.loggedInUser.findUnique({
      where: { userId: user.id },
    });

    if (loggedInUser) {
      // Update the existing record
      loggedInUser = await prisma.loggedInUser.update({
        where: { userId: user.id },
        data: { token, verifie: true },
      });
    } else {
      // Create a new LoggedInUser record
      loggedInUser = await prisma.loggedInUser.create({
        data: {
          userId: user.id,
          token,
          verifie: true,
        },
      });
    }

    // Send the response
    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred while logging in." },
      { status: 500 }
    );
  }
}

// Logout
export async function DELETE(req) {
    try {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader) throw new Error("Authorization header missing");
  
      const token = authHeader.split(" ")[1];
      if (!token) throw new Error("Token missing");
  
      if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT secret key is missing");
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userId = decoded?.id; // Ensure id exists in decoded token
  
      if (!userId) throw new Error("Invalid token payload");
  
      // Remove the user from the session
      await prisma.loggedInUser.delete({ where: { userId } });
  
      return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
    } catch (error) {
      console.error("Logout error:", error);
      return NextResponse.json(
        { message: "An error occurred during logout", error: error.message },
        { status: 500 }
      );
    }
  }