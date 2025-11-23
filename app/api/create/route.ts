import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        const cookieStore= await cookies();
        const token= cookieStore.get("token")
  
        if (!token) {
            return NextResponse.json(
                { error: "Authorization token not found" },
                { status: 401 }
            );
        }
          const tokenValue = token.value;
          let decodedToken;
        try{
            decodedToken=jwt.verify(tokenValue,process.env.JWT_SECRET!)
        }catch(err){
            return NextResponse.json({error:"Invalid or expired token" }, { status: 403 });
        }
        const userId=(decodedToken as {id:number}).id;
         if (!userId) {
         return NextResponse.json({ error: "Token is missing user information" }, { status: 403 });
        }
        const body=await req.json();
        const {title,content}=body;
        if(!title || !content){
             return new Response(
         JSON.stringify({ error:"Title  & content are  required !!" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
        );
        }
        // conect of post and user
       await prisma.post.create({
         data:{
            title:title,
            content:content,
            author:{
            connect:{id:userId}
          }
        }
    })
      return new Response(JSON.stringify(
            { message: "Post create successfull" }),
            { status: 201,headers: { "Content-Type": "application/json" },});
    }catch(error){
        console.log("---> Error at post",error)
        return  new Response (JSON.stringify({message:"Interal server error"}),{
            status:500,
            headers:{ "Content-Type": "application/json" }
        })
    }
}