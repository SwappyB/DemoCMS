import React from "react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

const page = () => {
  return (
    <div>
      <MaxWidthWrapper className="pb-2 pt-3 sm:pb-32 lg:pt-4 xl:pt-6 lg:pb-52">
        <div className="flex flex-col gap-4">
          <p className="text-5xl">[Page title]</p>
          <Separator />
          <p className="text-sm">Creating new page</p>
          <Separator />
          <Input />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
