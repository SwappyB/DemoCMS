import { db } from "@/db/prisma";

// Delete page
export async function DELETE(
    request: Request,
    { params }: { params: { slug: string } }) {
    try {
        const pageSlug = params.slug;

        const deletePage = await db.page.delete({ where: { slug: pageSlug } })

        return Response.json({
            success: true,
            status: 200,
            data: deletePage
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
