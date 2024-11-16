"use client";

import { useMemo, useState } from "react";

import { getPostTableColumns } from "./PostTableColumns";
import { DataTable } from "@/components/data-table/Table";
import { Post } from "@/types";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type RenderPostListProps = {
  data: Post[];
};

const RenderPostList = ({ data }: RenderPostListProps) => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deletePostSlug, setDeletePostSlug] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const initPostDelete = (slug: string) => {
    setDeletePostSlug(slug);
    setIsDeleteConfirmOpen(true);
  };

  const columns = useMemo(
    () =>
      getPostTableColumns({
        deletePostHandler: initPostDelete
      }),
    []
  );

  const deletePostHandler = async () => {
    try {
      const result = await fetch(`/api/posts/${deletePostSlug}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      const res = await result.json();
      if (res.success) {
        toast({
          title: "Success",
          description: res.message
        });

        router.refresh();
      } else {
        console.log(res);
        toast({
          title: "Oh, No!",
          description: res.data.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Oh, No!",
        description: "Something went wrong!",
        variant: "destructive"
      });
    } finally {
      setIsDeleteConfirmOpen(false);
      setDeletePostSlug("");
    }
  };

  return (
    <div>
      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        setIsOpen={setIsDeleteConfirmOpen}
        submitHandler={deletePostHandler}
      />
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default RenderPostList;
