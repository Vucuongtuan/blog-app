import { getNewBlog } from "@/api/blog.api";
import CardListBlog from "@/components/cardListBlog";
import Container from "@/components/container";
import TabAi from "@/components/tabAi";
import formatDate from "@/lib/date";
import { IBlog } from "@/types/blog.type";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const [getNew, getblog] = await Promise.all([
    getNewBlog(1, 6),
    getNewBlog(2),
  ]);

  if (getNew.statusCode === 404) {
    return (
      <main className="min-h-[1200px]">
        <Container>
          <h2>Chưa có bài viết nào</h2>
        </Container>
      </main>
    );
  }
  if (getNew.statusCode !== 200) {
    return <h2>{getNew.message}</h2>;
  }
  const data = await getNew.data.data;
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  return (
    <main className="w-full h-auto py-4 min-h-screen">
      <Container>
        <Suspense fallback={<>loading</>}>
          <section className="w-full grid lg:grid-cols-4 gap-4 grid-rows-3 h-auto min-h-[300px] lg:max-h-[600px] max-h-[1400px]">
            {data.map((item: IBlog, index: number) => (
              <Link
                href={`/${item.slug}`}
                className={`h-full w-full relative  ${
                  index === 0 || index === 1
                    ? "lg:col-span-2 lg:row-span-2"
                    : ""
                }`}
                key={item.id}
              >
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  height={index === 0 || index === 1 ? 500 : 200}
                  width={index === 0 || index === 1 ? 700 : 200}
                  loading="lazy"
                  className={`w-full   rounded-lg
                  ${
                    index === 0 || index === 1
                      ? "h-full object-cover"
                      : "h-2/3 object-cover object-center"
                  }
                    `}
                />
                <div
                  className={`p-1 w-full flex rounded-lg flex-col  items-center
                  ${
                    index === 0 || index === 1
                      ? "h-[100px] absolute bottom-0 bg-gradient-to-t text-white   from-[rgb(28,28,28)] via-[rgba(0, 0, 0, .39)] to-transparent"
                      : "h-[40%]  "
                  }
                    `}
                >
                  <Link
                    href={`/blog/${item.slug}`}
                    className={` font-semibold 
                    ${index === 0 || index === 1 ? "text-2xl" : "text-sm"}`}
                  >
                    {item.title}
                  </Link>

                  {index === 0 || index === 1 ? null : (
                    <div className="w-full ">
                      <span className="text-left text-sm text-black dark:text-[#6f6f6f] ">
                        {formatDate(item.createAt)}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </section>
        </Suspense>
        {getblog?.statusCode !== 200 ? null : (
          <section className="w-full h-auto min-h-[300px] flex mt-12">
            <div className="w-2/3 flex flex-col">
              <h2 className="text-2xl font-bold py-2">Xem thêm</h2>
              <CardListBlog data={getblog} />
            </div>
            <div className="w-1/3">asd</div>
          </section>
        )}
      </Container>
    </main>
  );
}
