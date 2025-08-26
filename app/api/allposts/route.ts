import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { id: "desc" }, 
      include: {
        author: {
          select: {
            id: true,
            username: true,
           
          },
        },
      },
    });

    return Response.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return Response.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
