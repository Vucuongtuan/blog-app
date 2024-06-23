import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "TC NEW | Author",
  description: "Trang cá nhân cho người sáng tạo nội dung",
  openGraph: {
    title: "TC NEW | Author",
    description: "Trang cá nhân cho người sáng tạo nội dung",
    images: [
      {
        url: "/TC News.png",
      },
    ],
  },
};

export default function AuthorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
