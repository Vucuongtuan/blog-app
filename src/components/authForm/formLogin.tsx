"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getNewBlog, loginAuthor } from "@/api/blog.api";
import { create } from "@/app/action";
import { useRouter } from "next/navigation";
import Link from "next/link";
const formLoginSchema = z.object({
  identifier: z.string().min(2).max(50),
  password: z.string().min(2, "Password phải từ 2 ký tự trở lên").max(50),
});

export default function FormLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formLoginSchema>) => {
    setIsLoading(true);
    try {
      const loginQuery = await loginAuthor(values.identifier, values.password);
      if (loginQuery.statusCode !== 200) {
        toast.error(loginQuery.message);
        return;
      }
      const profile = {
        name: loginQuery.name,
        id: loginQuery.id,
      };
      localStorage.setItem("profile", JSON.stringify(profile));
      await create(loginQuery.access_token, loginQuery.expiresIn);
      toast.success(loginQuery.message);
      router.push("/", { scroll: false });
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tài khoản</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tên tài khoản hoặc email"
                  className={`rounded-md border   dark:bg-transparent dark:text-white text-sm  hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:hover:border-white   dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition duration-200`}
                  {...field}
                />
              </FormControl>
              <FormDescription>Nhập tên tài khoản hoặc email </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input
                  placeholder="Mật khẩu"
                  className={`rounded-md border   dark:bg-transparent dark:text-white text-sm  hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:hover:border-white   dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition duration-200`}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full hover:bg-slate-950">
          Submit
        </Button>
      </form>
    </Form>
  );
}
