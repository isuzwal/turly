
import {hash} from "bcrypt-ts"
import { prisma } from "@/lib/prisma";



interface Signup{
    username?:string,
    email?:string,
    password?:string
};
// get rquest
// utility function


export async function POST(req:Request) {
    try{
        const body =await req.json();
        const {username ,email,password}:Signup=body;
        if(!email || !password || !username){
            return new Response(JSON.stringify({error:"Email &&  Username required"}))
        }
        // checking user existing or not
        const isUserexits=await prisma.user.findUnique({
            where:{email},
        });
        if(isUserexits){
            return new Response(JSON.stringify({error:"Account already exits "}),{
                status:409,headers:{"Content-Type":"application/json"}
            })
        }
        
        const hashpassword= await hash(password ,10);
        // this for the request part
         await prisma.user.create({
            data:{
                username:username,
                email,
                password:hashpassword,
            }
         })
         // response
          return new Response(JSON.stringify(
            { message: "Account created successfully" }),
            { status: 201,headers: { "Content-Type": "application/json" },});
    }catch(error){
        console.log(error)
        return  new Response (JSON.stringify({message:"Interal sever error"}),{
            status:500,
            headers:{ "Content-Type": "application/json" }
        })
    }
    
}