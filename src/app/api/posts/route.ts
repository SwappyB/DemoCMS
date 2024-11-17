import { NextRequest } from "next/server";
import { db } from "@/db/prisma";
import { generateUniqueSlug } from "@/lib/slugify";

import { getPostBySlug } from "@/server/service/postService";

// Get Post
export async function GET() {
    try {
        const allPosts = await db.post.findMany({
            orderBy: {
                createdAt: "desc",
            },
        })

        return Response.json({
            success: true,
            status: 200,
            data: allPosts
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

// Create Post
export async function POST(request: NextRequest) {
    try {
        const { title, slug, content, pluginContent } = await request.json();

        /**
         * Generate unique slug
         * Create new post
         */

        if (slug) {
            const isSlugExists = await getPostBySlug(slug);
            if (isSlugExists) {
                return Response.json({
                    success: false,
                    status: 200,
                    message: `${slug} is already in use.`,
                })
            }
        }

        const newSlug = slug || await generateUniqueSlug(title);

        const newPost = await db.post.create({ data: { title, slug: newSlug, content, pluginContent: JSON.stringify(pluginContent) } });

        return Response.json({
            success: true,
            status: 200,
            message: "New post created!",
            data: newPost
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

// Update Post
export async function PATCH(request: NextRequest) {
    try {
        const { title, slug, content, id, pluginContent } = await request.json();

        const newSlug = slug || await generateUniqueSlug(title);

        if (slug) {
            const isSlugExists = await db.post.findUnique({ where: { slug, NOT: { id } } });
            if (isSlugExists) {
                return Response.json({
                    success: false,
                    status: 200,
                    message: `${slug} is already in use.`,
                })
            }
        }

        const postUpdate = await db.post.update({ where: { id }, data: { title, slug: newSlug, content, pluginContent: JSON.stringify(pluginContent) } });

        return Response.json({
            success: true,
            status: 200,
            message: "Post Updated!",
            data: postUpdate
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