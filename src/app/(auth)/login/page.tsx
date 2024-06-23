import { get } from "@/app/action";
import FormLogin from "@/components/authForm/formLogin";
import Container from "@/components/container";
import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Link from "next/link";
import React from "react";

export default async function LoginPage() {
  const getToken = await get("access_token");

  return (
    <main className="w-full h-auto py-4 min-h-screen">
      <Container>
        <section className="w-full min-h-scree n flex justify-center ">
          <div className="w-auto min-w-[500px] h-[400px] px-4 my-[100px]">
            {getToken ? (
              <>
                <h1 className="text-4xl font-semibold">
                  Ohh !! Bạn đã đăng nhập rồi{" "}
                </h1>
                <p className="text-center py-6">
                  <span>
                    Chuyển đến
                    <Link
                      href="/"
                      scroll={false}
                      className="px-1 text-blue-400 hover:text-red-500 rounded-md   dark:bg-transparent dark:text-white text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:hover:border-white   dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition duration-200"
                    >
                      trang chủ
                    </Link>
                  </span>
                </p>
              </>
            ) : (
              <>
                <div className="text-4xl w-full font-semibold pb-4  ">
                  <h1>Đăng nhập </h1>
                  <p className="   -mt-4 text-xl">
                    <TextGenerateEffect words={"cho người sáng tạo nội dung"} />
                  </p>
                </div>
                <FormLogin />
              </>
            )}
          </div>
        </section>
      </Container>
    </main>
  );
}
