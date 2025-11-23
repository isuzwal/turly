import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function PUT(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if (!token) {
      return NextResponse.json({ error: "Authorization token not found" }, { status: 401 });
    }
    const tokenValue = token.value;
    let decodedToken;
    try {
      decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET!);
    } catch (err) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
    }
    const userId = (decodedToken as { id: number }).id;
    if (!userId) {
      return NextResponse.json({ error: "Token is missing user information" }, { status: 403 });
    }
    const { username ,profile_image} = await req.json();
    console.log(username);
    await prisma.user.update({
      where: { id: userId },
      data: { username: username,profile_image:profile_image},
    });
    return new Response(JSON.stringify({ message: "Profile update successfully" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("---> Error at post", error);
    return new Response(JSON.stringify({ message: "Interal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
