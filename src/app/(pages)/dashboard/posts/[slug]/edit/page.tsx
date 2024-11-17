import React from "react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import getPostData from "./_actions/getPostData";

import EditForm from "./_components/EditForm";

type tParams = Promise<{ slug: string }>;

const EditPost = async ({ params }: { params: tParams }) => {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <div>
      <MaxWidthWrapper className="pb-2 pt-3 sm:pb-32 lg:pt-4 xl:pt-6 lg:pb-52">
        <div className="flex flex-col gap-4">
          <EditForm data={postData} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default EditPost;
