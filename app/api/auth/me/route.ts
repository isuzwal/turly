import { NextRequest,NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!; 

export async function GET(req:NextRequest){
    const token=req.cookies.get("token")?.value;
    if(!token){
          return NextResponse.json({ error: "Login Please" }, { status: 400 });
    }
    try{
        // check the user  token 
        const decodeId=jwt.verify(token,JWT_SECRET) as jwt.JwtPayload;
        const user=await prisma.user.findUnique({
            where:{id:decodeId.id},
            select:{id:true, username:true, email:true,posts:true,bookmarks:true,profile_image:true}
        })
         if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
   return NextResponse.json(user);

    } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}