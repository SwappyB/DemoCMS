"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

import type { Post } from "@/types";

import { format } from "date-fns";

type PostTableColumnProps = {
  deletePostHandler: (slug: string) => void;
};

export const getPostTableColumns = ({
  deletePostHandler
}: PostTableColumnProps): ColumnDef<Post>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/posts/` + row.original.slug + "/edit"}
        className="underline"
      >
        <div>{row.getValue("title")}</div>
      </Link>
    )
  },
  {
    accessorKey: "slug",
    header: () => <div>Slug</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("slug")}</div>;
    }
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Modified
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = format(
        new Date(row.getValue("updatedAt") as Date),
        "yyyy-MM-dd HH:mm"
      );
      return <div>{formattedDate}</div>;
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const post = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              // TODO: Add share link later
              onClick={() => navigator.clipboard.writeText(post.slug)}
            >
              Copy share link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <a href={`/posts/${post.slug}`}>
              <DropdownMenuItem>Open Post</DropdownMenuItem>
            </a>
            <DropdownMenuItem
              onClick={() => deletePostHandler(post.id.toString())}
            >
              Delete Post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
