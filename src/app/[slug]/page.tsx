import { getBlogById } from "@/api/blog.api";
import Container from "@/components/container";
import { CircleUser } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import React from "react";
type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;
  const product = await getBlogById(slug);
  const previousImages = (await parent).openGraph?.images || [];
  const image = product?.data?.thumbnail;
  return {
    title: product?.data?.title,
    description: product?.data?.description,
    openGraph: {
      title: `${product?.data?.title}`,
      description: product?.data?.description,
      images: [{ url: image, width: 800, height: 600 }, ...previousImages],
    },
  };
}

export default async function DetailBlog({
  params,
}: {
  params: { slug: string };
}) {
  const res = await getBlogById(params.slug);
  if (res.statusCode !== 200) {
    return <>Blog bot found</>;
  }
  const blog = res.data;
  const date = new Date(blog.createAt);
  const formattedTime = `${date.getHours()}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")} ${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return (
    <>
      <Image
        src={blog.thumbnail}
        alt={blog.description}
        height={600}
        width={1200}
        className="h-[400px] w-full object-cover"
      />
      <main className="w-full h-auto ">
        <Container>
          <div className="px-8">
            <h1 className="text-5xl text-center py-4">{blog.title}</h1>
            <div className="text-[#6b6b6b] text-center flex justify-center items-center space-x-2">
              <CircleUser className="h-4 w-4" />
              <span>{blog.author.name}</span>
              <span>{formattedTime}</span>
            </div>
            <div
              className="mt-4"
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />
          </div>
        </Container>
      </main>
    </>
  );
}
