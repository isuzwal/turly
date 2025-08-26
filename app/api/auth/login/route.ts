
import jwt from "jsonwebtoken";
import { serialize } from 'cookie'
import  {compare}from "bcrypt-ts"
import { prisma } from "@/lib/prisma";

interface LoginBody{
    email:string
    password:string,
}
export async function POST(req:Request){
    try{
   const body=await req.json();
   const {email,password}:LoginBody=body;
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email & password required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
   
   // check user is exsit ot not 
  const user=await prisma.user.findUnique({
     where:{email},
  })
  if(!user){
    return new Response(JSON.stringify({ error: "Account not found!" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
  }
 //-> user who login with google 
  if (!user.password) {
  return new Response(
    JSON.stringify({ error: "This account was created with Google. Please log in with Google." }),
    {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }
  );
}
  const isMatchPassowrd=await compare(password,user.password);
  if(!isMatchPassowrd){
      throw new Error("Invalid credentials");
    } 
  // set cookies here 
  const token=jwt.sign({id:user.id},process.env.JWT_SECRET!, { expiresIn: '7d' })
  // this beacuse of the samesite 
  const cookie=serialize('token',token,{
    httpOnly:true,
    secure:process.env.NODE_ENV==="production",
    sameSite:'strict',
    path:"/",
    maxAge: 60 * 60 * 24 * 7
  })
    return new Response(
      JSON.stringify({
        message: "Logged in successfully",
        user: {
          id: user.id,
          email: user.email,
          username: user.username, 
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookie,
        },
      }
    );
    }catch(error){
        return  new Response (JSON.stringify({message:"Interal sever error"}),{
            status:500,
            headers:{ "Content-Type": "application/json" }
        })
    }
    }
