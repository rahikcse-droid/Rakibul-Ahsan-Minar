// app/api/admin/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

// Define Admin schema if not already defined
const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Connect to database and verify admin credentials
    await connectDB();
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValidPassword = await bcryptjs.compare(password, admin.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    // Create response with success message
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    // Set the cookie
    response.cookies.set({
      name: "admin-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
