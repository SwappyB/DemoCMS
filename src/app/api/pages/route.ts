import { NextRequest } from "next/server";
import { db } from "@/db/prisma";
import { slugify } from "@/lib/slugify";

// Create Page
export async function POST(request: NextRequest) {
    try {
        const { title, slug, route, content, pluginContent } = await request.json();

        /**
         * Generate unique slug
         * Create new page
         */

        // TODO: Unique slug
        const newSlug = slugify(slug || title);

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

        const newSlug = slugify(slug || title);

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