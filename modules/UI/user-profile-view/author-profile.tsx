"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";

import Themenavabar from "../nava-bar-view/theme-navbar";
import Image from "next/image";
import { useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

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
interface UserChangeProps {
  profile_image?: string;
  username?: string | null;
}

export const AuthorProfile: React.FC<ProfileProps> = ({ userInfo }) => {
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

  return (
    <div className="flex flex-col bg-slate-100 dark:bg-black dark:text-white">
      <Themenavabar />
      <div className="h-screen  mt-12 max-w-3xl w-full flex  flex-col gap-3 mx-auto px-1 py-6 dark:bg-neutral-900 dark:border-neutral-900 border border-zinc-100 bg-zinc-100">
        <div className="rounded-md border flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-1 sm:gap-3 p-3 max-w-3xl mx-auto w-full dark:bg-neutral-950 dark:border-neutral-950 dark:shadow bg-zinc-200 border-zinc-200">
          <div className="flex w-full h-24 sm:w-28 sm:h-24  rounded-md sm:rounded-full overflow-hidden mx-auto sm:mx-0">
            <Image
              src={userInfo?.profile_image ?? ""}
              alt="_profile_image"
              height={100}
              width={100}
              className="sm:rounded-full rounded border-2 dark:border-neutral-950 border-zinc-200 object-cover w-full h-full"
            />
          </div>

          <div className="border dark:border-neutral-900 dark:bg-neutral-900 bg-slate-100 border-slate-00 flex flex-col sm:flex-row sm:items-center justify-between w-full gap-3 px-3 py-2 rounded-md">
            <div className="flex flex-col w-full sm:w-1/2">
              <h1 className="sm:text-[24px] font-semibold font-mono text-[20px] text-neutral-700 dark:text-neutral-300">
                {userInfo?.username}
              </h1>
              <p className="text-neutral-500 font-mono font-medium break-all">{userInfo?.email}</p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto w-full ">
          {userInfo?.posts && userInfo.posts.length > 0 ? (
            userInfo.posts.map((blog) => (
              <div key={blog.id}>
                <Card className="bg-card dark:bg-neutral-950 shadow border border-neutral-100 dark:border-neutral-900 m-1 rounded-md">
                  <CardHeader className="flex items-center gap-2">
                    <div
                      className="flex px-3 py-1.5  border w-fit rounded-md flex-row items-center justify-start gap-1          bg-zinc-100 border-neutral-200 shadow-[inset_0_4px_6px_rgba(210,210,210,0.3)]
                       dark:shadow-[inset_0_4px_6px_rgba(52,52,52,0.5)] dark:bg-neutral-950/80 dark:border-neutral-900  ">
                      <Image
                        src={userInfo?.profile_image ?? " "}
                        width={20}
                        height={20}
                        alt="_prifle_image"
                        className=" rounded-full"
                      />
                      <p className="text-sm font-semibold dark:text-neutral-500 text-neutral-700">
                        {userInfo?.username ?? "Unknown Author"}
                      </p>
                    </div>
                  </CardHeader>
                  <Link key={blog.id} href={`/post/${blog.id}`} className="flex flex-col gap-1 ">
                    <CardTitle className="text-xl   px-6 pt-1">{blog.title}</CardTitle>
                    <CardContent className="text-neutral-500">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={components}>
                        {blog.content ? blog.content.slice(0, 259) : "no-content"}
                      </ReactMarkdown>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            ))
          ) : (
            <div className=" max-w-xl mx-auto w-full rounded-md flex flex-col gap-2  justify-center items-center py-8  ">
              <h1 className="dark:text-neutral-300 text-[16px] font-semibold font-mono">
                Share your first blog to world
              </h1>
              <Link
                href={"/create"}
                className="text-[10px] dark:text-neutral-500  dark:hover:text-neutral-300  duration-300 ease-in-out transition-all font-medium border-dashed border dark:bg-neutral-900 cursor-pointer px-6 py-1.5 ">
                Post your first blog
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
