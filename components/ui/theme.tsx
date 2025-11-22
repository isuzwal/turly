"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"

export function Theme() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu  >
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-7 h-7">
          <Sun className=" cursor-pointer scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1rem]  cursor-pointer  w-[1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark:bg-neutral-950 ">
        <DropdownMenuItem className="hover:bg-neutral-400/10 cursor-pointer" onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-neutral-400/10 cursor-pointer" onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
