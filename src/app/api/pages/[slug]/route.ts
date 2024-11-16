import { db } from "@/db/prisma";

type tParams = Promise<{ slug: string }>;

// Delete page
export async function DELETE(
    request: Request,
    { params }: { params: tParams }) {
    try {
        const { slug } = await params;

        const deletePage = await db.page.delete({ where: { slug } })

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
