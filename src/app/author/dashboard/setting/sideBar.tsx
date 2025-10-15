"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navLink = [
  {
    id: 1,
    name: "Thông tin cá nhân",
    href: "/author/dashboard/setting",
  },
] as { id: number; name: string; href: string }[];

export default function SideBar() {
  const pathName = usePathname();

  return (
    <div className="w-[250px] h-auto min-h-[800px] rounded-lg lg:block hidden">
      <nav className="h-full  border-2 rounded-lg p-2">
        <ul className="w-full space-y-2">
          {navLink.map((link) => (
            <li
              key={link.id}
              className={`w-full cursor-pointer  hover:bg-slate-800 p-2 rounded-lg  ${
                pathName === link.href ? " bg-slate-800" : ""
              }`}
            >
              <Link href={link.href} className={``}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
