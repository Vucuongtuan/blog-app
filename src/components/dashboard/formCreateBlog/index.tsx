"use client";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import slugify from "slugify";
import Image from "next/image";
import TextEditorQuill from "./textEditorQuill";
import { createBlog } from "@/api/blog.api";
import toast from "react-hot-toast";
import { deleteCookie } from "@/app/action";
import Schema from "./schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabAi from "@/components/tabAi";

const formCreateBlogSchema = z.object({
  title: z.string().max(100, "Tiêu đề không quá 50 ký tự"),
  slug: z.string().max(100, "Slug không quá 20 ký tự"),
  description: z.string().max(200, "Mô tả không quá 100 ký tự"),
  thumbnail: z.instanceof(File).refine((file) => file instanceof File, {
    message: "Thumbnail must be a file",
  }),
  content: z.string().min(2),
  authorId: z.string(),
  hashtags: z.array(z.string()),
});

function FromCreateBlog({ reset }: { reset: () => void }) {
  const [slugText, setSlugText] = useState<string>("");
  const [listHashtags, setListHashtags] = useState<string[]>([]);
  const [currentHashtag, setCurrentHashtag] = useState<string>("");
  const [slugURL, setSlugURL] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");
  const [loadings, setLoadings] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formCreateBlogSchema>>({
    resolver: zodResolver(formCreateBlogSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      thumbnail: undefined,
      content: "",
      authorId: "",
    },
  });
  const handleChangeSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slugURL = slugify(e.target.value, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: false,
      locale: "vi",
      trim: true,
    });
    form.setValue("title", e.target.value);
    form.setValue("slug", slugURL);
    setSlugText(e.target.value);
    setSlugURL(slugURL);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newHashtag = currentHashtag.trim();
      if (newHashtag) {
        setListHashtags([...listHashtags, newHashtag]);
        setCurrentHashtag("");
      }
    }
  };
  const handleContentChange = (value: string) => {
    setContent(value);
    form.setValue("content", value);
  };
  const onSubmit = useCallback(
    async (data: z.infer<typeof formCreateBlogSchema>) => {
      setLoadings(true);
      const profile =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("profile") ?? "null")
          : "null";
      if (profile === "null") {
        setLoadings(false);
        await deleteCookie("access_token");
        return;
      } else if (profile !== "null") {
        const value = {
          authorId: profile.id,
          title: data.title,
          description: data.description,
          thumbnail: data.thumbnail,
          content: data.content,
          slug: data.slug,
          hashtags: data.hashtags,
        };

        const res = await createBlog(value);
        if (res.statusCode !== 201) {
          setLoadings(false);
          toast.error(res.message);
          return;
        }
        setLoadings(false);
        toast.success(res.message);
        form.reset();
        reset();
        window.location.reload();
        return;
      }
    },
    []
  );
  useEffect(() => {
    form.setValue("hashtags", listHashtags);
  }, [form, form.setValue, listHashtags]);
  useEffect(() => {
    if (thumbnailFile) {
      form.setValue("thumbnail", thumbnailFile);
    }
  }, [form, form.setValue, thumbnailFile]);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log("====================================");
      console.log(files[0]);
      console.log("====================================");
      const file = files[0];
      setThumbnailFile(file);
      const image = URL.createObjectURL(file);
      setThumbnail(image);
    } else {
      setThumbnail(null);
      setThumbnailFile(null);
    }
  };
  const handleChangeHashTags = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentHashtag(event.target.value);
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="lg:flex gap-2  h-auto lg:max-h-[900px]"
        >
          <div className="p-2  lg:w-1/3 space-y-2  border-2 h-auto lg:min-h-[650px] max-h-[700px] rounded-lg">
            <Tabs defaultValue="create" className="w-full h-full flex flex-col">
              <TabsList className="m-auto h-auto">
                <TabsTrigger value="create">Create</TabsTrigger>
                <TabsTrigger value="contentAI">Content AI</TabsTrigger>
              </TabsList>
              <TabsContent value="create" className="w-full flex-grow">
                <h1 className="text-2xl font-medium">Tạo bài viết</h1>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiêu đề bài viết </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tiêu đề bài viết"
                          className={`rounded-md border   dark:bg-transparent dark:text-white text-sm  hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:hover:border-white   dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition duration-200`}
                          {...field}
                          value={slugText}
                          onChange={handleChangeSlug}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <div className="flex  items-center    ">
                          <span className="pr-2 text-sm w-auto">
                            {process.env.NEXT_PUBLIC_BASE_URL}/{slugURL}
                          </span>
                        </div>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <p>
                        <FormControl>
                          <textarea
                            placeholder="description"
                            className={`rounded-md border w-full resize-none p-1   dark:bg-transparent dark:text-white text-sm  hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:hover:border-white   dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition duration-200`}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </p>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hình ảnh</FormLabel>
                      <p>
                        <FormControl>
                          <Input
                            type="file"
                            className={`rounded-md border w-full resize-none p-1   dark:bg-transparent dark:text-white text-sm  hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:hover:border-white   dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition duration-200`}
                            onChange={handleFileChange}
                          />
                        </FormControl>
                        <FormMessage />

                        <div className="w-full h-[160px] mt-2 rounded-lg overflow-hidden  border-2">
                          <Image
                            src={thumbnail || "/defaultImage.webp"}
                            alt={"demo thumbnail"}
                            height={200}
                            width={200}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </p>
                    </FormItem>
                  )}
                />
                <label htmlFor="Schema">Schema {"(max 6 schema)"}</label>
                <Schema
                  currentHashtag={currentHashtag}
                  handleChangeHashTags={handleChangeHashTags}
                  handleKeyDown={handleKeyDown}
                  listHashtags={listHashtags}
                  setListHashtags={setListHashtags}
                />
                <Button type="submit">Tạo</Button>
              </TabsContent>
              <TabsContent value="contentAI" className="w-full flex-grow">
                <TabAi />
              </TabsContent>
            </Tabs>
          </div>
          <div className="lg:w-2/3 h-full max-h-[700px] overflow-y-scroll  rounded-lg  mt-8 lg:mt-0 border-2 ">
            <TextEditorQuill
              content={content}
              setContent={handleContentChange}
            />
          </div>
        </form>
      </Form>
      {loadings ? (
        <div className="h-full w-full bg-[#d3d3d34a] fixed top-0 left-0 z-50 flex justify-center items-center">
          <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600"></div>
        </div>
      ) : null}
    </>
  );
}
export default React.memo(FromCreateBlog);
