"use client";

import { useMemo, useState } from "react";

import { getPageTableColumns } from "./PageTableColumns";

import { DataTable } from "@/components/data-table/Table";
import { Page } from "@/types";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type RenderPageListProps = {
  data: Page[];
};

const RenderPageList = ({ data }: RenderPageListProps) => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deletePageSlug, setDeletePageSlug] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const initPostDelete = (slug: string) => {
    setDeletePageSlug(slug);
    setIsDeleteConfirmOpen(true);
  };

  const columns = useMemo(
    () =>
      getPageTableColumns({
        deletePageHandler: initPostDelete
      }),
    []
  );

  const deletePageHandler = async () => {
    try {
      const result = await fetch(`/api/pages/${deletePageSlug}`, {
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
      setDeletePageSlug("");
    }
  };

  return (
    <div>
      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        setIsOpen={setIsDeleteConfirmOpen}
        submitHandler={deletePageHandler}
      />
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default RenderPageList;
