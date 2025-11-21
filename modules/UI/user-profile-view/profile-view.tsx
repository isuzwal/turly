"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Themenavabar from "../nava-bar-view/theme-navbar";
import Image from "next/image";

interface UserInfo {
  id: number;
  username: string | null;
  email: string;
  profile_image: string | null;
  posts: Post[];
}

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

interface ProfileProps {
  userInfo: UserInfo | null;
}

export const Profile: React.FC<ProfileProps> = ({ userInfo }) => {
  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return match ? (
        <SyntaxHighlighter
          // @ts-expect-error style typing is wrong in lib
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
  console.log(userInfo)
  return (
    <div className="flex flex-col bg-slate-100 dark:bg-black dark:text-white">
      <Themenavabar />
      <div className="h-screen  mt-12 max-w-5xl w-full flex  flex-col gap-3 mx-auto px-4 py-6 dark:bg-neutral-900 dark:border-neutral-900 border border-zinc-200 bg-zinc-200">
        <div className="rounded-md border flex items-center justify-center gap-3 p-1.5 max-w-3xl mx-auto w-full dark:bg-neutral-950 dark:border-neutral-950 dark:shadow bg-zinc-50 border-zinc-50">
          <div className="flex w-28 h-24 rounded-md">
            <Image
              src={userInfo?.profile_image ?? ""}
              alt="_profle_image"
              height={20}
              width={100}
              className="rounded-full border-2 dark:border-neutral-950 border-zinc-200 "
            />
          </div>
          <div className="border dark:border-neutral-600 border-neutral-200 flex flex-1 flex-col gap-1 px-2 rounded-md py-1.5">
            <h1 className="sm:text-[24px] font-semibold  font-mono text-[20px] text-neutral-700 dark:text-neutral-300">
              {userInfo?.username}
            </h1>
            <p className="text-neutral-500 font-mono font-medium">{userInfo?.email}</p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto w-full dark:bg-neutral-950 dark:border-neutral-950 dark:shadow bg-zinc-50 border-zinc-50 rounded-md px-2 py-2">
          {userInfo?.posts && userInfo.posts.length > 0 ? (
            userInfo.posts.map((blog) => (
              <Link key={blog.id} href={`/post/${blog.id}`}>
                <Card className="bg-card dark:bg-neutral-950 shadow border border-neutral-100 dark:border-neutral-900 m-1 rounded-md">
                  <CardHeader className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>{userInfo?.username?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium">{userInfo?.username ?? "Unknown Author"}</p>
                  </CardHeader>
                  <CardTitle className="text-xl px-2 pt-1">{blog.title}</CardTitle>
                  <CardContent>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={components}>
                      {blog.content ? blog.content.slice(0, 259) : "no-content"}
                    </ReactMarkdown>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
             <div className=" max-w-xl mx-auto w-full rounded-md flex flex-col gap-2  justify-center items-center py-8  ">
             <h1 className="dark:text-neutral-300 text-[16px] font-semibold font-mono">Share your first blog to world</h1>
             <Link 
              href={"/create"}
              className="text-[10px] dark:text-neutral-500  dark:hover:text-neutral-300  duration-300 ease-in-out transition-all font-medium border-dashed border dark:bg-neutral-900 cursor-pointer px-6 py-1.5 ">Post  your first blog</Link>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
