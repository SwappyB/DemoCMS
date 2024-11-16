import { db } from "@/db/prisma";

// Delete post
export async function DELETE({ params }: { params: { slug: string } }) {
    try {
        const postSlug = params.slug;

        const deletePost = await db.post.delete({ where: { slug: postSlug } })

        return Response.json({
            success: true,
            status: 200,
            data: deletePost
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
