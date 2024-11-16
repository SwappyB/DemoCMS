import { db } from "../../db/prisma";

export const getAllPlugins = async () => {
    return db.plugin.findMany();
};

export const togglePlugin = async (id: number, enabled: boolean) => {
    return db.plugin.update({
        where: { id },
        data: { enabled },
    });
};

export const registerPlugin = async (name: string, slug: string) => {
    return db.plugin.create({
        data: { name, slug, enabled: false },
    });
};