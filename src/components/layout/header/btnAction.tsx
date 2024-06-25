"use client";

import { deleteCookie } from "@/app/action";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useStoreZ from "@/lib/stores";

export default function BtnAction() {
  const { profile } = useStoreZ();
  const handleLogout = async () => {
    await deleteCookie("access_token");
    return;
  };

  // useEffect(() => {
  //   if (profile === null) {
  //     const deleteAccessToken = async () => {
  //       await deleteCookie("access_token");
  //       return;
  //     };
  //     deleteAccessToken();
  //     return;
  //   }
  // }, []);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-md border px-2   dark:bg-transparent dark:text-white text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:hover:border-white   dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition duration-200">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{profile?.name}</DropdownMenuLabel>
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
