import React from "react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";

import getPostData from "./_actions/getPostData";

import EditForm from "./_components/EditForm";

const EditPost = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const postData = await getPostData(slug);

  return (
    <div>
      <MaxWidthWrapper className="pb-2 pt-3 sm:pb-32 lg:pt-4 xl:pt-6 lg:pb-52">
        <div className="flex flex-col gap-4">
          <p className="text-5xl">
            <span className="text-muted-foreground">Editing </span>
            {postData?.title}
          </p>
          <Separator />
          <EditForm data={postData} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default EditPost;
