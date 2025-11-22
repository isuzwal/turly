"use client";
import { Button } from "@/components/ui/button";
import { Theme } from "@/components/ui/theme";
import { LogOut, PlusCircle } from "lucide-react";

import { Turtle, Github, Star, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface NavbarViewProps {
  username?: string | null;
  profile_image?: string | null;
}

export const NavbarView = ({ username, profile_image }: NavbarViewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
 const dropdownRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const renderUserButton = () => {
    if (username) {
      return (
        <div  
        ref={dropdownRef}
        className="max-w-48 mx-auto w-full h-auto rounded-xl gap-4 bg-neutral-50 border border-neutral-100 dark:bg-neutral-900  dark:border-neutral-950  flex flex-col items-center justify-start px-2 py-5 z-50">
          <h1
            className="w-full flex gap-1 items-center  font-medium hover:bg-neutral-200  rounded-[8px] py-1 px-2 cursor-pointer border bg-secondary    dark:bg-neutral-950/80 dark:border-neutral-950 dark:hover:bg-neutral-950 hover:opacity-60 shadow-xs
          hover:border-neutral-100 duration-300 ease-in-out transition-all 
          text-neutral-600 dark:text-neutral-100">
            <Image
              src={profile_image ?? " "}
              alt="_profile_image"
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-[12px] mt-1">{username}</span>
          </h1>
          <Button
            className=" flex  w-full text-[12px] font-medium hover:bg-neutral-200  rounded-md py-1.5 px-2 border bg-secondary  cursor-pointer   dark:bg-neutral-950/80 dark:border-neutral-950 dark:hover:bg-neutral-950 hover:opacity-60
            text-neutral-600 dark:text-neutral-100">
            <Link href="/create" className="flex gap-3 w-full items-center  px-2 ">
              <span> Create post</span>
              <PlusCircle size={16} /> 
            </Link>
          </Button>
          <div className="flex gap-1 items-center w-full">
            <Link
              href={`/profile/${username}`}
              className="w-full text-[12px] font-medium hover:bg-neutral-200  rounded-md py-1.5 px-2 border bg-secondary  cursor-pointer   dark:bg-neutral-950/80 dark:border-neutral-950 dark:hover:bg-neutral-950 hover:opacity-60
            text-neutral-600 dark:text-neutral-100">
              Profile
            </Link>
            <Theme />
          </div>
          <Button  className="w-full flex items-center cursor-pointer bg-red-500 text-neutral-50 hover:bg-red-400">
            <span>Logout</span>
            <LogOut className="size-4" />
            </Button>
        </div>
      );
    }
    return (
      <div className="flex gap-1 items-center">
      <Button asChild variant="outline" className="font-semibold px-6 py-1.5">
        <Link href="/login">Start</Link>
      </Button>
        <Theme />
      </div>
    );
  };

  return (

    <div className=" w-full border-b dark:bg-neutral-950 dark:border-neutral-900 border-neutral-400 z-20 bg-neutral-100 flex justify-center fixed">
      <div className="max-w-7xl mx-auto w-full relative ">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex gap-2 items-center">
            <Turtle size={25} />
            <h1 className="font-semibold text-base">Turly</h1>
          </div>
               <Image
              src={profile_image ?? " "}
              alt="_profile_image"
              width={30}
              height={30}
              className="rounded-full cursor-pointer"
              onClick={()=>setIsExpanded((prev)=>!prev)}
            />
        </div>
        {isExpanded && (
          <div className=" absolute right-2 top-14 z-20 max-w-44 mx-auto w-full rounded-md p-1">
        {renderUserButton()}
          </div>
        )}
      </div>
    </div>
  );
};
