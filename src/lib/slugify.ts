import { getPostBySlug } from "@/server/service/postService";
import { getPageBySlug } from "@/server/service/pageService";

export async function generateUniqueSlug(title: string, type?: "post" | "page"): Promise<string> {
    let slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

    const originalSlug = slug;
    let count = 1;

    if (type === "page")
        while (await isSlugPageExists(slug)) {
            slug = `${originalSlug}-${count}`;
            count++;
        }
    else
        while (await isSlugPostExists(slug)) {
            slug = `${originalSlug}-${count}`;
            count++;
        }

    return slug;
}

async function isSlugPageExists(slug: string): Promise<boolean> {
    const existingPost = await getPageBySlug(slug);
    return existingPost !== null;
}

async function isSlugPostExists(slug: string): Promise<boolean> {
    const existingPost = await getPostBySlug(slug);
    return existingPost !== null;
}
