import React from "react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { PostTable } from "@/components/data-table/Posts";

import { getPosts } from "./_actions";

const Posts = async () => {
  const postData = await getPosts();
  console.log(postData);
  return (
    <div>
      <MaxWidthWrapper className="pb-2 pt-3 sm:pb-32 lg:pt-4 xl:pt-6 lg:pb-52">
        <div className="flex flex-row gap-4 items-center">
          <p className="text-5xl">Posts</p>
          <Link href={"/dashboard/posts/create"}>
            <Button variant="outline">Create new</Button>
          </Link>
        </div>
        <PostTable data={postData} />
      </MaxWidthWrapper>
    </div>
  );
};

export default Posts;
