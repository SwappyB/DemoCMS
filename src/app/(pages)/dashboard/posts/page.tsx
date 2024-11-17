import React from "react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { getPosts } from "./_actions/getPostData";

import RenderPostList from "./_components/RenderPostList";

const Posts = async () => {
  const postData = await getPosts();
  return (
    <div>
      <MaxWidthWrapper className="pb-2 pt-3 mb-20 sm:pb-32 lg:pt-4 xl:pt-6 lg:pb-52">
        <div className="flex flex-row gap-4 items-center">
          <p className="text-3xl sm:text-4xl">Posts</p>
          <Link href={"/dashboard/posts/create"}>
            <Button variant="outline">Create new</Button>
          </Link>
        </div>
        <RenderPostList data={postData} />
      </MaxWidthWrapper>
    </div>
  );
};

export default Posts;
