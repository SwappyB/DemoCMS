import React from "react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { getPages } from "./_actions/getPageData";

import RenderPageList from "./_components/RenderPageList";

export const fetchCache = "force-no-store";

const PageList = async () => {
  const pageData = await getPages();
  return (
    <div>
      <MaxWidthWrapper className="pb-2 pt-3 sm:pb-32 lg:pt-4 xl:pt-6 lg:pb-52">
        <div className="flex flex-row gap-4 items-center">
          <p className="text-3xl sm:text-4xl">Pages</p>
          <Link href={"/dashboard/pages/create"}>
            <Button variant="outline">Create new</Button>
          </Link>
        </div>
        <RenderPageList data={pageData} />
      </MaxWidthWrapper>
    </div>
  );
};

export default PageList;
