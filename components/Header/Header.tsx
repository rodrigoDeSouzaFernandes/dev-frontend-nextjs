"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect } from "next/navigation";
import { useLogout } from "@/hooks/useLogout";

import userImage from "@/assets/user.webp";
import ThemeModeToggle from "../ThemeModeToogle";

export default function Header(): React.ReactElement {
  const { logout } = useLogout();

  return (
    <header className="shadow-md bg-muted/70">
      <div className="max-w-[1400px] m-auto flex items-center justify-between h-16 p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="p-0 hover:bg-transparent"
            onClick={() => redirect("/")}
          >
            <h1 className="text-3xl font-bold">Next Store</h1>
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <ThemeModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer" data-testid="header-avatar">
                <AvatarImage src={userImage.src} alt="User" />
                <AvatarFallback>RC</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
