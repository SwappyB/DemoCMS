import { db } from "@/db/prisma";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import RenderEditorContent from "@/components/WYSIWYG/RenderContent";
import RenderBlocks from "@/plugins/RenderBlocks";
import PluginInit from "./_components/plugin";
type tParams = Promise<{ slug: string[] }>;

export default async function DynamicPage({ params }: { params: tParams }) {
  const { slug } = await params;
  // Convert the slug array into a route string
  const route = `/${slug.join("/")}`;

  // Fetch the page from the database
  const pageData = await db.page.findUnique({
    where: { route }
  });

  if (!pageData) {
    return <div>Page not found</div>;
  }

  const pluginData =
    pageData?.pluginContent &&
    typeof pageData.pluginContent === "string" &&
    pageData?.pluginContent.length
      ? JSON.parse(pageData?.pluginContent as string)
      : [];

  return (
    <div>
      <PluginInit />
      <MaxWidthWrapper className="pb-2 pt-3 sm:pb-32 lg:pt-4 xl:pt-6 lg:pb-52">
        <div className="flex flex-col gap-4">
          <div className="text-5xl">{pageData?.title}</div>
          <RenderEditorContent content={pageData?.content} />
          <RenderBlocks blocks={pluginData} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
