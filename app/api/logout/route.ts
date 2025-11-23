import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore =  await cookies();
  cookieStore.delete("token");
  return NextResponse.json({ message: "Logged out" });
}
