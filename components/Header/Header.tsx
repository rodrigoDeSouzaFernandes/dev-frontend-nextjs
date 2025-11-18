"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="  px-4 bg-white shadow-md">
      <div className="max-w-[1400px] m-auto flex items-center justify-between h-16 p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => alert("toggle sidebar")}
          >
            <Menu />
          </Button>
          <h1 className="text-xl font-bold">Next Store</h1>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback>RC</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => alert("perfil")}>
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert("logout")}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
