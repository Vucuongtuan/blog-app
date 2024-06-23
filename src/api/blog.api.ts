import http from "@/lib/http";
import { IBlog } from "@/types/blog.type";
export const getNewBlog = async (page?: number, limit?: number) => {
  try {
    const res = await http.get(
      `/blog/new?page=${page || 1}${limit ? `&limit=${limit}` : ""}`
    );
    return res.data;
  } catch (err) {
    return {
      statusCode: 500,
      message: "Lỗi không thể get blog",
    };
  }
};
export const loginAuthor = async (identifier: string, password: string) => {
  const res = await http.post(`/auth/login`, {
    identifier,
    password,
  });
  return res.data;
};
export const createBlog = async (data: any) => {
  const arrayHashTags = JSON.stringify(data.hashtags);
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("thumbnail", data.thumbnail);
  formData.append("content", data.content);
  formData.append("slug", data.slug);
  formData.append("authorId", data.authorId);
  formData.append("hashtags", arrayHashTags);

  const res = await http.post(`/blog/create`, formData);
  console.log("====================================");
  console.log(res);
  console.log("====================================");
  return res.data;
};
export const getBlogById = async (slug: string) => {
  const res = await http.get(`/blog/${slug}`);
  return res.data;
};
export const deleteBlog = async (id: string) => {
  const res = await http.delete(`/blog/delete/${id}`);

  return res.data;
};

export const updateBlog = async (id: string, data: any) => {
  const arrayHashTags = JSON.stringify(data.hashtags);
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("thumbnail", data.thumbnail);
  formData.append("content", data.content);
  formData.append("slug", data.slug);
  formData.append("authorId", data.authorId);
  formData.append("hashtags", arrayHashTags);
  const res = await http.put(`/blog/update/${id}`, formData);
  return res.data;
};
export const getBlogID = async (id: string) => {
  const res = await http.get(`/blog/by=id/${id}`);
  return res.data;
};
export const getBlogByHashtag = async (hashtag: string) => {
  const res = await http.post(`/blog/hashtag`, { hashtag: hashtag });
  return res.data;
};
