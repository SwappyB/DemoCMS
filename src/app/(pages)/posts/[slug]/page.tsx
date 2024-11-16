import getPostData from "./_actions/getPostData";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import { format } from "date-fns";

import RenderEditorContent from "@/components/WYSIWYG/RenderContent";
import RenderBlocks from "@/plugins/RenderBlocks";
import PluginInit from "./_components/plugin";

type tParams = Promise<{ slug: string[] }>;

const PostPage = async ({ params }: { params: tParams }) => {
  const { slug } = await params;
  const postData = await getPostData(slug[0]);

  const pluginData =
    postData?.pluginContent &&
    typeof postData.pluginContent === "string" &&
    postData?.pluginContent.length
      ? JSON.parse(postData?.pluginContent as string)
      : [];

  return (
    <div>
      <PluginInit />
      <MaxWidthWrapper className="pb-2 pt-3 sm:pb-32 lg:pt-4 xl:pt-6 lg:pb-52">
        <div className="flex flex-col gap-4">
          <div className="text-5xl">{postData?.title}</div>
          <div className="text-muted-foreground text-lg">
            Last updated at:{" "}
            {format(postData?.updatedAt as Date, "yyyy-MM-dd HH:mm")}
          </div>
          <RenderEditorContent content={postData?.content} />
          <RenderBlocks blocks={pluginData} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default PostPage;
