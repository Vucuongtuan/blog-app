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
import { useRouter } from "next/navigation";
import api from "@/api/author.api";
import { Eye, EyeOff } from "lucide-react";
const formRegisterSchema = z
  .object({
    nameAccount: z.string().min(2).max(50),
    email: z.string().min(2).email("Định dạng email không hợp lệ !!"),
    name: z.string().min(2).max(50),
    SDT: z.string().min(9).max(13, "số điện thoại ko vượt quá 13 chữ số"),
    password: z.string().min(2, "Password phải từ 2 ký tự trở lên").max(50),
    confirmPassword: z
      .string()
      .min(2, "Password phải từ 2 ký tự trở lên")
      .max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác thực không khớp",
    path: ["confirmPassword"],
  });

export default function FormRegister() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPass, setShowPass] = React.useState<boolean>(false);
  const [showConfirmPass, setConfirmPass] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      nameAccount: "",
      email: "",
      name: "",
      SDT: "",
      password: "",
      confirmPassword: "",
    },
  });
  const handleShowPass = () => setShowPass(!showPass);
  const handleConfirmPass = () => setConfirmPass(!showConfirmPass);
  const onSubmit = async (values: z.infer<typeof formRegisterSchema>) => {
    //set loading from submit
    setIsLoading(true);
    try {
      const valuesData = {
        nameAccount: values.nameAccount,
        name: values.name,
        email: values.email,
        password: values.password,
        SDT: values.SDT,
      };

      //call api register account user
      const registerQuery = await api.registerAccount(valuesData);
      //check if register failed
      if (
        registerQuery.statusCode !== 200 ||
        registerQuery.statusMessage !== 201
      ) {
        toast.error(registerQuery.message);
        return;
      }

      //register successfully
      toast.success(registerQuery.message);

      // next to login page
      router.push("/login", { scroll: false });
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="nameAccount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tài khoản</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tên tài khoản "
                  className={`rounded-md border   dark:bg-transparent dark:text-white text-sm  hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:hover:border-white   dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition duration-200`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên đầy đủ</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tên đầy đủ"
                  className={`rounded-md border   dark:bg-transparent dark:text-white text-sm  hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:hover:border-white   dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition duration-200`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  className={`rounded-md border   dark:bg-transparent dark:text-white text-sm  hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:hover:border-white   dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition duration-200`}
                  {...field}
                />
              </FormControl>
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
                <div className="flex relative">
                  <Input
                    placeholder="Mật khẩu"
                    type={showPass ? "text" : "password"}
                    className={`rounded-md border   dark:bg-transparent dark:text-white text-sm  hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:hover:border-white   dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition duration-200`}
                    {...field}
                  />
                  {showPass ? (
                    <Eye
                      className="float-right absolute right-2 top-[5px]"
                      onClick={handleShowPass}
                    />
                  ) : (
                    <EyeOff
                      className="float-right absolute right-2 top-[5px]"
                      onClick={handleShowPass}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác thực mật khẩu</FormLabel>
              <FormControl>
                <div className="flex relative">
                  <Input
                    placeholder="Xác thực mật khẩu"
                    type={showConfirmPass ? "text" : "password"}
                    className={`rounded-md border   dark:bg-transparent dark:text-white text-sm  hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:hover:border-white   dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition duration-200`}
                    {...field}
                  />
                  {showConfirmPass ? (
                    <Eye
                      className="float-right absolute right-2 top-[5px]"
                      onClick={handleConfirmPass}
                    />
                  ) : (
                    <EyeOff
                      className="float-right absolute right-2 top-[5px]"
                      onClick={handleConfirmPass}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="SDT"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điên thoai</FormLabel>
              <FormControl>
                <Input
                  placeholder="Số điên thoai"
                  type={"SDT"}
                  className={`rounded-md border   dark:bg-transparent dark:text-white text-sm  hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:hover:border-white   dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition duration-200`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full hover:bg-slate-950"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Đăng ký"}
        </Button>
      </form>
    </Form>
  );
}
