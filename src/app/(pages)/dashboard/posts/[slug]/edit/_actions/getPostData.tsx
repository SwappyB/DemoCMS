"use server";

import { db } from "@/db/prisma";

const getPostData = async (slug: string) => {
  const postData = await db.post.findUnique({ where: { slug } });

  return postData;
};

export default getPostData;
