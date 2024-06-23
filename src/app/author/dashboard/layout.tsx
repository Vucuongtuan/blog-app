import HeaderDash from "@/components/dashboard/headerDash";
import NavBarDash from "@/components/dashboard/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";

import React from "react";
import Provider from "./provider";
import { cookies } from "next/headers";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkCookie: any | null = cookies().get("access_token") || null;
  const token: string | null = checkCookie !== null ? checkCookie.value : null;

  return (
    <Provider token={token}>
      <TooltipProvider>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <NavBarDash />
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <HeaderDash />
            <main className="w-full h-auto max-w-[2000px] m-auto">
              {children}
            </main>
          </div>
        </div>
      </TooltipProvider>
    </Provider>
  );
}
