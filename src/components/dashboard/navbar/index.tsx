import {
  ClipboardList,
  Home,
  LineChart,
  Package,
  Package2,
  PencilLine,
  Settings,
  ShoppingCart,
  Smile,
  Users2,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function NavBarDash() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          href="#"
          className="group  flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Smile className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/author/dashboard"
              className="flex  h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Trang chủ</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Trang chủ</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/author/dashboard/blog"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <ClipboardList className="h-5 w-5" />
              <span className="sr-only">Danh sách bài viết</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Danh sách bài viết</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/author/dashboard/create"
              className="flex h-9 w-9 items-center justify-center rounded-lg  text-accent-foreground  transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <PencilLine className="h-5 w-5" />
              <span className="sr-only">Tạo bài viết</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Tạo bài viết</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/author/dashboard/community"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Users2 className="h-5 w-5" />
              <span className="sr-only">Cộng đồng</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Cộng đồng</TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/author/dashboard/setting"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
