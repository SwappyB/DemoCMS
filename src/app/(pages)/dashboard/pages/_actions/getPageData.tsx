"use server";

import { db } from "@/db/prisma";

export const getPages = async () => {
  const allPages = await db.page.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
  return allPages;
};
