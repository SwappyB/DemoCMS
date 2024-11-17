import { db } from "../../db/prisma";

export const getPosts = async () => {
    const allPosts = await db.post.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    return allPosts;
};

export const getPostBySlug = async (slug: string) => {
    return db.post.findUnique({ where: { slug } });
};

export const createPost = async (data: never) => {
    const { title, slug, content } = data;
    return db.post.create({
        data: { title, slug, content },
    });
};

export const updatePost = async (id: number, data: never) => {
    return db.post.update({
        where: { id },
        data,
    });
};

export const deletePost = async (id: number) => {
    return db.post.delete({ where: { id } });
};