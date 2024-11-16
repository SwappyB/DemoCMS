import { NextRequest } from "next/server";
import { db } from "@/db/prisma";
import { slugify } from "@/lib/slugify";


// Get Post
export async function GET() {
    try {

        /**
         * Generate unique slug
         * Create new post
         */

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
        const { title, slug, content } = await request.json();

        /**
         * Generate unique slug
         * Create new post
         */

        const newSlug = slugify(slug || title);

        const newPost = await db.post.create({ data: { title, slug: newSlug, content } });

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
        const { title, slug, content, id } = await request.json();

        const newSlug = slugify(slug || title);

        const postUpdate = await db.post.update({ where: { id }, data: { title, slug: newSlug, content } });

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