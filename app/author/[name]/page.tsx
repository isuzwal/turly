

import { notFound } from "next/navigation";
import {prisma} from "@/lib/prisma"
import { AuthorProfile } from "@/modules/UI/user-profile-view/author-profile";

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
    console.error(error || "Fail to get user profile");
  }
}

interface PageProps {
  params:Promise <{
    name: string;
  }>;
}



export default async function Page({ params }: PageProps) {
  const { name } = await params;
  
  const profileUser = await getProfileUser(name);
  if (!profileUser) {
    notFound();
  }

  return <AuthorProfile userInfo={profileUser} />;
}