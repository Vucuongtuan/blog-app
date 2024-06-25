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
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAuthor } from "@/api/blog.api";
import { create } from "@/app/action";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
const formLoginSchema = z.object({
  identifier: z.string().min(2, "Phải ít nhất 2 ký tự").max(50),
  password: z.string().min(2, "Password phải từ 2 ký tự trở lên").max(50),
});

export default function FormLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPass, setShowPass] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  //set show password
  const handleShowPassword = () => setShowPass(!showPass);

  //submit form login account
  const onSubmit = async (values: z.infer<typeof formLoginSchema>) => {
    //set loading from submit
    setIsLoading(true);
    try {
      //call api post login user
      const loginQuery = await loginAuthor(values.identifier, values.password);

      //if loginQuery failed
      if (loginQuery.statusCode !== 200) {
        toast.error(loginQuery.message);
        return;
      }

      //create profile
      const profile = {
        name: loginQuery.name,
        id: loginQuery.id,
      };

      //add profile to local storage
      localStorage.setItem("profile", JSON.stringify(profile));

      // add access token to cookie
      await create(loginQuery.access_token, profile, loginQuery.expiresIn);
      toast.success(loginQuery.message);

      // next to home page login successfully
      router.replace("/", { scroll: false });
    } catch (err) {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
    } finally {
      // set loading = false submit form end
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
              <FormMessage />
              <FormDescription>Nhập tên tài khoản hoặc email </FormDescription>
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
                <div className="flex relative">
                  <Input
                    placeholder="Mật khẩu"
                    type={showPass ? "text" : "password"}
                    className={`rounded-md border    dark:bg-transparent dark:text-white text-sm  hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:hover:border-white   dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition duration-200`}
                    {...field}
                  />{" "}
                  {showPass ? (
                    <Eye
                      className="float-right absolute right-2 top-[5px]"
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <EyeOff
                      className="float-right absolute right-2 top-[5px]"
                      onClick={handleShowPassword}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
              <FormDescription>Nhập mật khẩu đủ 8 ký tự</FormDescription>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full hover:bg-slate-950"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Đăng nhập"}
        </Button>
      </form>
    </Form>
  );
}
