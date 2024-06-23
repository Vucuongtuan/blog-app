"use client";

import { deleteCookie } from "@/app/action";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BtnAction() {
  const handleLogout = async () => {
    await deleteCookie("access_token");
    localStorage.removeItem("profile");
    window.location.reload();
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/author/dashboard">Quản lý bài viết</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/" scroll={false} onClick={handleLogout}>
              Đăng xuất
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
