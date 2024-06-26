import { getBlogByHashtag } from "@/api/blog.api";
import Container from "@/components/container";
import { IBlog } from "@/types/blog.type";
import Transition from "@/utils/transition";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const dataPase = [
  { id: 1, name: "tech" },
  { id: 2, name: "sports" },
];

const checkHashtag = (params: string) => {
  let hashtag: string | null = null;
  if (params === "tech") {
    hashtag = "Công nghệ";
  } else if (params === "sports") {
    hashtag = "Thể thao";
  } else {
    hashtag = null;
  }
  return hashtag;
};
export default async function DynamicPage({
  params,
}: {
  params: { page: string };
}) {
  const check = checkHashtag(params.page);

  if (check === null) {
    return (
      <Container>
        <h1>Không thể truy cập vào bài viết</h1>
      </Container>
    );
  }

  const res = await getBlogByHashtag(check);

  if (res.statusCode !== 200) {
    return (
      <Container>
        <h1>Không thể truy cập vào bài viết</h1>
      </Container>
    );
  }
  const blog = await res?.data;

  return (
    <main className="w-full  h-auto">
      <Container>
        <section className="w-full grid lg:grid-cols-4 gap-8">
          {blog.map((item: IBlog, index: number) => (
            <Transition key={index}>
              <Link href={`/${item.slug}`} className="w-full h-full rounded-lg">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  height={200}
                  width={200}
                  className="h-[80%] rounded-lg w-full object-cover py-2 rounded-lg"
                />
                <div className="w-full h-[20%]">
                  <span className=" font-semibold font-md">{item.title}</span>
                </div>
              </Link>
            </Transition>
          ))}
        </section>
      </Container>
    </main>
  );
}
