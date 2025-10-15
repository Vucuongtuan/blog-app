import React from "react";
import FormUpdateBlog from "./form";
import { getBlogById, getBlogID } from "@/api/blog.api";

export default async function UpdateBlog({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const res = await getBlogID(searchParams.id);

  return (
    <section className="px-2">
      <FormUpdateBlog id={searchParams.id} defaultData={res.data} />
    </section>
  );
}
