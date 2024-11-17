import { db } from "../../db/prisma";

export const getPageBySlug = async (slug: string) => {
    return db.page.findUnique({ where: { slug } });
};

export const createPage = async (data: never) => {
    const { title, slug, content, route } = data;
    return db.page.create({
        data: { title, slug, content, route },
    });
};

export const updatePage = async (id: number, data: never) => {
    return db.page.update({
        where: { id },
        data,
    });
};

export const deletePage = async (id: number) => {
    return db.page.delete({ where: { id } });
};