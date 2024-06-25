import FromCreateBlog from "@/components/dashboard/formCreateBlog";
import React from "react";

export default function CreateBlog({ reset }: { reset: () => void }) {
  return (
    <section className="w-full h-auto lg:max-h-[650px] overflow-hidden  px-2  ">
      <FromCreateBlog reset={reset} />
    </section>
  );
}
