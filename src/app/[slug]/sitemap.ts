import { getBlogById, getNewBlog } from "@/api/blog.api";
import { MetadataRoute } from "next";

export default async function sitemap({
  params,
}: {
  params: { slug: string };
}): Promise<MetadataRoute.Sitemap> {
  const res = await getBlogById(params.slug);
  return res.data.map((product: any) => ({
    url: `${process.env.URL}/details/${product.slug}`,
    lastModified: product.createAt,
    priority: 0.8,
  }));
}
