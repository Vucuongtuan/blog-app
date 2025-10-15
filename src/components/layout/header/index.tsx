import React from "react";
import Container from "../../container";
import Link from "next/link";
import { ModeToggle } from "../../theme-provider/modeToggle";
import { Button } from "../../ui/button";
import BtnAction from "./btnAction";

export default function Header({ auth }: { auth: boolean }) {
  const action = () => {
    if (auth) {
      return <BtnAction />;
    }
    return (
      <Link
        href="/login"
        className=" h-full font-medium px-2 leading-8  rounded-md border   dark:bg-transparent dark:text-white text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:hover:border-white   dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition duration-200"
      >
        Đăng nhập
      </Link>
    );
  };
  return (
    <header className="w-full h-[60px]  ">
      <Container>
        <div className="flex items-center justify-between h-full w-full">
          <nav className=" leading-8 w-full">
            <ul className="flex lg:space-x-10 text-sm space-x-2">
              <li>
                <Link href={`/`}>Trang chủ</Link>
              </li>
              <li>
                <Link href={`/category/tech`}>Công nghệ</Link>
              </li>
              <li>
                <Link href={`/category/sports`}>Thể thao</Link>
              </li>
            </ul>
          </nav>
          <div className="w-1/3 flex justify-end space-x-4 ">
            <ModeToggle />
            {action()}
          </div>
        </div>
      </Container>
    </header>
  );
}
