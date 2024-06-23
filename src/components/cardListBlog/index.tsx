import formatDate from "@/lib/date";
import { IBlog } from "@/types/blog.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ICardListBlogProps {
  data: {
    statusCode: number;
    message: string;
    data: {
      total: number;
      totalPages: number;
      data: IBlog[];
    };
  };
}
export default function CardListBlog({ data }: ICardListBlogProps) {
  if (data.statusCode === 404) {
    return <h3 className="text-xl font-semibold">Chưa có bài viết nào</h3>;
  }
  if (data.statusCode !== 200 && data.statusCode !== 404) {
    return <h3 className="text-xl font-semibold">Lỗi khi lấy dữ liệu</h3>;
  }
  return (
    <section className="w-full h-full">
      <ul className=" space-y-5 h-full">
        {data?.data?.data.map((blog) => (
          <li className="  min-h-[120px] w-full" key={blog.id}>
            <Link
              href={`/${blog.slug}`}
              className="flex h-full w-full space-x-3"
            >
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                height={200}
                width={200}
                className="object-cover w-1/4"
              />
              <div className="w-3/4 min-h-[120px] relative ">
                <span className=" font-semibold"> {blog.title}</span>
                <p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        blog.content.length > 100
                          ? `${blog.content.slice(0, 100)}...`
                          : blog.content,
                    }}
                  />
                </p>
                <div className=" absolute bottom-0 right-0 text-right w-1/2 h-[30px] ">
                  {formatDate(blog.createAt)}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
