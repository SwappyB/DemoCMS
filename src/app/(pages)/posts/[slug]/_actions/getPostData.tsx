"use server";

import { getPostBySlug } from "@/server/service/postService";

const getPostData = async (slug: string) => {
  return await getPostBySlug(slug);
};

export default getPostData;
