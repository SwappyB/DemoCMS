import { db } from "@/db/prisma";

type tParams = Promise<{ slug: string }>;

// Delete post
export async function DELETE(
    request: Request,
    { params }: { params: tParams }) {
    try {
        const { slug } = await params;

        const deletePost = await db.post.delete({ where: { slug } })

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
