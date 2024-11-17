"use server";

import { db } from "@/db/prisma";
export const dynamic = "force-dynamic";

export const getPosts = async () => {
  const allPosts = await db.post.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
  return allPosts;
};
