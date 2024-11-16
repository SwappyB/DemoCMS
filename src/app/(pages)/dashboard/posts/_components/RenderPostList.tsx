"use client";

import { useMemo } from "react";

import { getPostTableColumns } from "./PostTableColumns";
import { DataTable } from "@/components/data-table/Table";
import { Post } from "@/types";

type RenderPostListProps = {
  data: Post[];
};

const RenderPostList = ({ data }: RenderPostListProps) => {
  const deletePostHandler = (id: string) => {
    console.log(id);
  };

  const columns = useMemo(
    () =>
      getPostTableColumns({
        deletePostHandler
      }),
    []
  );

  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default RenderPostList;
