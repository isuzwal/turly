

import { Profile } from "@/modules/UI/user-profile-view/profile-view";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers'
import { notFound } from "next/navigation";
import {prisma} from "@/lib/prisma"


async function getCurrentloginuser(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user =await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, username: true, email: true, posts: true },
    })
    return user ;

  } catch (error) {
    console.log(error)
  }
}

async function getProfileUser(name: string) {
  try {
    const profileUser = await prisma.user.findUnique({
      where: {username:name},
      select: {
        id: true,
        username: true,
        email: true,
        posts: true,
        profile_image:true,
         
      },
    });
    return profileUser;
  } catch (error) {
    console.log(error)
  }
}

interface PageProps {
  params:Promise <{
    name: string;
  }>;
}



export default async function Page({ params }: PageProps) {
  const { name } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token) {
     await getCurrentloginuser(token);
  }
  const profileUser = await getProfileUser(name);
  if (!profileUser) {
    notFound();
  }

  return <Profile userInfo={profileUser} />;
}