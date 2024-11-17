/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { format } from "date-fns";

import RenderEditorContent from "@/components/WYSIWYG/RenderContent";
import RenderBlocks from "@/plugins/RenderBlocks";

type PreviewProps = {
  data: { title: string; slug: string; content?: any };
  pluginContent: any[];
};

export function Preview({ data, pluginContent }: PreviewProps) {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="text-5xl">{data?.title}</div>
        <div className="text-muted-foreground text-lg">
          Last updated at: {format(new Date(), "yyyy-MM-dd HH:mm")}
        </div>
        <RenderEditorContent content={data?.content} />
        <RenderBlocks blocks={pluginContent} />
      </div>
    </div>
  );
}
