import { IBlog, IBlogResponse } from "@/types/blog.type";
import Transition from "@/utils/transition";
import { Item } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IListBlogProps {
  data: IBlogResponse;
}
export default function ListBlog({ data }: IListBlogProps) {
  if (data.statusCode === 404) {
    return (
      <>
        <h2>Chưa có bài viết nào</h2>
      </>
    );
  }
  if (data.statusCode !== 200 && data.statusCode !== 404) {
    return (
      <>
        <h2>Lỗi khi lấy danh sách bài viết</h2>
      </>
    );
  }
  return (
    <>
      <Transition index={0.5}>
        <h2 className="px-4 text-2xl py-6 font-medium">
          Danh sách bài viết mới nhất
        </h2>
      </Transition>
      <div className=" w-full min-h-[250px] grid lg:grid-cols-4 gap-4  grid-cols-2">
        {data &&
          data?.data &&
          data?.data?.data?.map((blog, index: number) => (
            <Transition index={index} key={blog.id}>
              <Link href={blog.slug} className=" w-full h-full  rounded-lg ">
                <div className=" w-full h-full p-2 ">
                  <div className="rounded-lg h-[200px] w-full overflow-hidden">
                    <Image
                      src={blog.thumbnail}
                      alt={blog.description}
                      height={200}
                      width={200}
                      className="object-cover w-full h-full "
                    />
                  </div>
                  <div className="w-full h-1/4 py-2 font-medium">
                    {blog.title}
                  </div>
                </div>
              </Link>
            </Transition>
          ))}
      </div>
    </>
  );
}
