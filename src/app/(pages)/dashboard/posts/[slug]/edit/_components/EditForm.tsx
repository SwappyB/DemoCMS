/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";

import { postFormSchema } from "@/components/posts/PostFormSchema";
import PostForm from "@/components/posts/PostForm";

import type { Post } from "@/types";

type EditPostProps = {
  data: Post | null;
};

const EditForm = ({ data }: EditPostProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [pluginContent, setPluginContent] = useState<any[]>(
    data?.pluginContent && data?.pluginContent.length
      ? JSON.parse(data?.pluginContent)
      : []
  );

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: data?.title,
      slug: data?.slug,
      content: data?.content
    }
  });

  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    try {
      setIsLoading(true);

      const result = await fetch("/api/posts", {
        method: "PATCH",
        body: JSON.stringify({
          id: data?.id,
          title: values.title,
          slug: values.slug,
          content: values.content,
          pluginContent
        }),
        headers: { "Content-Type": "application/json" }
      });
      const res = await result.json();
      if (res.success) {
        toast({
          title: "Success",
          description: res.message
        });
      } else {
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
      setIsLoading(false);
    }
  }

  return (
    <div>
      <PostForm
        form={form}
        submitHandler={onSubmit}
        isFormLoading={isLoading}
        content={pluginContent}
        setContent={setPluginContent}
      />
    </div>
  );
};

export default EditForm;
