import api from "@/api/author.api";
import TableBlog from "@/components/tableBlog";
import React from "react";

export default async function BlogDashPage() {
  return (
    <div className="px-4 h-auto">
      <h1 className="text-3xl font-semibold">Danh sách bài viết</h1>
      <section className="w-full  py-1">
        <TableBlog />
      </section>
    </div>
  );
}
