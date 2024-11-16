import { NextRequest } from "next/server";
import { db } from "@/db/prisma";
import { generateUniqueSlug } from "@/lib/slugify";
import { getPageBySlug } from "@/server/service/pageService";

// Create Page
export async function POST(request: NextRequest) {
    try {
        const { title, slug, route, content, pluginContent } = await request.json();

        if (slug) {
            const isSlugExists = await getPageBySlug(slug);
            if (isSlugExists) {
                return Response.json({
                    success: false,
                    status: 200,
                    message: `${slug} is already in use.`,
                })
            }
        }

        const newSlug = slug || await generateUniqueSlug(title, "page");

        const isRouteInUse = await db.page.findUnique({ where: { route } });
        if (isRouteInUse) {
            return Response.json({
                success: false,
                status: 200,
                message: `${route} is already in use.`,
            })
        }


        const newPage = await db.page.create({ data: { title, slug: newSlug, content, pluginContent: JSON.stringify(pluginContent), route } });

        return Response.json({
            success: true,
            status: 200,
            message: "New page created!",
            data: newPage
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            success: false,
            status: 500,
            message: "Something went wrong!"
        })
    }
}

// Update Page
export async function PATCH(request: NextRequest) {
    try {
        const { title, slug, route, content, id, pluginContent } = await request.json();

        const newSlug = slug || await generateUniqueSlug(title, "page");

        if (slug) {
            const isSlugExists = await db.page.findUnique({ where: { slug, NOT: { id } } });
            if (isSlugExists) {
                return Response.json({
                    success: false,
                    status: 200,
                    message: `${slug} is already in use.`,
                })
            }
        }

        const isRouteInUse = await db.page.findUnique({ where: { route, NOT: { id } } });
        if (isRouteInUse) {
            return Response.json({
                success: false,
                status: 200,
                message: `${route} is already in use.`,
            })
        }

        const pageUpdate = await db.page.update({ where: { id }, data: { title, slug: newSlug, route, content, pluginContent: JSON.stringify(pluginContent) } });

        return Response.json({
            success: true,
            status: 200,
            message: "Page Updated!",
            data: pageUpdate
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            success: false,
            status: 500,
            message: "Something went wrong!"
        })
    }
}