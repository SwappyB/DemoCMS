"use server";

import { getPageBySlug } from "@/server/service/pageService";

const getPageData = async (slug: string) => {
  return await getPageBySlug(slug);
};

export default getPageData;
