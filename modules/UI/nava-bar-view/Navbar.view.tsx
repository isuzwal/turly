"use client";
import { Button } from "@/components/ui/button";
import { Theme } from "@/components/ui/theme";
import { PlusCircle } from "lucide-react";

import { Turtle, Github, Star, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface NavbarViewProps {
  username?: string | null;
  profile_image?: string | null;
}

export const NavbarView = ({ username,profile_image }: NavbarViewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderUserButton = () => {
    if (username) {
      return (
        <div className="flex gap-5  items-center">
        
            <Link href={`/profile/${username}`}>
              <Image src={profile_image?? " "} alt="_profile_image" width={40} height={40} className="rounded-full" />
            </Link>
         

          {/* <Button>
            <Link href="/create" className="flex gap-1 items-center">
              <PlusCircle size={18} /> New Post
            </Link>
          </Button>
           <button className="cursor-pointer">
              <Theme />
            </button> */}
        </div>
      );
    }

    return (
      <Button asChild variant="outline" className="font-semibold px-6 py-1.5">
        <Link href="/login">Start</Link>
      </Button>
    );
  };

  return (
    <div className="w-full border-b dark:bg-neutral-950 dark:border-neutral-900 border-neutral-400 z-20 bg-neutral-100 flex justify-center fixed">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex gap-2 items-center">
            <Turtle size={25} />
            <h1 className="font-semibold text-base">Turly</h1>
          </div>
          <div className="hidden md:flex gap-2 items-center">
            {renderUserButton()}
            {/* <Link     href="https://github.com/isuzwal/turly" className=" py-2 rounded-md dark:bg-neutral-900 dark:border-neutral-900 bg-secondary border-secondary cursor-pointer flex items-center gap-1 border">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <Github className="w-4 h-4 ml -1" />
              </Link> */}
              {/* <Theme /> */}
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden p-2 rounded-md transition-colors cursor-pointer"
          >
            {isExpanded ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isExpanded && (
          <div className="md:hidden absolute top-full left-0 right-0 dark:bg-neutral-950 bg-white border-t shadow-lg z-50">
            <div className="flex flex-col gap-3 p-4">
              {renderUserButton()}
              {/* <Link  href="https://github.com/isuzwal/turly" className=" border py-2 rounded-md dark:bg-neutral-900 dark:border-neutral-900 bg-secondary border-secondary cursor-pointer flex items-center justify-center gap-1 w-full">
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                <Github className="w-4 h-4 ml-1" />
              </Link> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
