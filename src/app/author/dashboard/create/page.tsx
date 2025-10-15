import FromCreateBlog from "@/components/dashboard/formCreateBlog";
import { cookies } from "next/headers";
import React from "react";

export default async function CreateBlog() {
  return (
    <section className="w-full h-auto lg:max-h-[650px] overflow-hidden  px-2  ">
      <FromCreateBlog />
    </section>
  );
}
