"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SquareArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { toast } from "sonner";
import PostCardLoading from "./loading";
import Image from "next/image";
export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: number;
    username: string | null;
    profile_image: string | null;
  };
}

export default function PostCard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return match ? (
        <SyntaxHighlighter
          // @ts-expect-error
          style={oneDark}
          language={match[1]}
          PreTag="div"
          {...props}>
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-gray-200 px-1 rounded" {...props}>
          {children}
        </code>
      );
    },
  } as Components;

  // function fo the share link
  const handleShareblog = async (post: Post, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const shareData = {
      title: post.title,
      text: `Check out this post :${post.title}`,
      url: `${window.location.origin}/post/${post.id}`,
    };
    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      const textArea = document.createElement("textarea");
      textArea.value = shareData.url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast.success("Link copied to clipboard!");
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/allposts");
        const data = await res.json();
        await new Promise((r) => setTimeout(r, 600));
        setPosts(data);
      } catch (err: any) {
        if (err.response) {
          toast.error(err.response.data);
        } else {
          toast.error("Someting went wrong !!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  console.log(posts);
  if (loading) {
    return <PostCardLoading />;
  }

  return (
    <div className="space-y-6 ">
      {posts.map((post) => (
        <div key={post.id}>
          <Card
            key={post.id}
            className="border dark:border-neutral-900 border-zinc-200 rounded-xl  px-3 ">
            <CardHeader className="p-0">
              <div className="flex px-3 py-1.5  border w-fit rounded-md flex-row items-center justify-start gap-1   bg-zinc-100 border-neutral-200 shadow-[inset_0_4px_6px_rgba(210,210,210,0.3)]
                dark:shadow-[inset_0_4px_6px_rgba(52,52,52,0.5)] dark:bg-neutral-950/80 dark:border-neutral-900  ">
                <Image
                  src={post.author?.profile_image ?? " "}
                  width={20}
                  height={20}
                  alt="_prifle_image"
                  className=" rounded-full"
                />

                <p className="text-sm font-semibold dark:text-neutral-500 text-neutral-700">
                  {post.author?.username ?? "Unknown Author"}
                </p>
              </div>
            </CardHeader>
            <Link key={post.id} href={`/post/${post.id}`} className="flex flex-col gap-1 px-2">
              <CardTitle className="text-xl ">
                <p>{post.title}</p>
              </CardTitle>
              <CardContent className="px-2  text-neutral-500 dark:text-neutral-400 font-medium">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={components}>
                  {post.content ? post.content.slice(0, 259) : "no-content"}
                </ReactMarkdown>
              </CardContent>
            </Link>
            <CardFooter className="flex items-center  gap-1 space-x-4">
              <button className="cursor-pointer hover:text-blue-500">
                <SquareArrowUpRight onClick={(e) => handleShareblog(post, e)} size={18} />
              </button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
