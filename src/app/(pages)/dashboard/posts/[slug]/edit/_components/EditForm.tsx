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

import { executeHooks } from "@/plugins/hooks";
import { usePlugins } from "@/plugins/PluginContext";

import { Preview } from "@/components/Preview";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type EditPostProps = {
  data: Post | null;
};

const EditForm = ({ data }: EditPostProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [isPreview, setIsPreview] = useState(false);

  const { hooks, plugins } = usePlugins();

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
  const watchedValues = form.watch();

  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    try {
      setIsLoading(true);

      await executeHooks(hooks, "onSave", plugins, pluginContent);

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
          description: res.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Something went wrong!";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        title: "Oh, No!",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex  flex-row gap-10 items-center">
        {!isPreview ? (
          <p className="text-5xl">
            <span className="text-muted-foreground">Editing </span>
            {data?.title}
          </p>
        ) : (
          ""
        )}
        <Button variant={"outline"} onClick={() => setIsPreview(!isPreview)}>
          {isPreview ? "Back to Editor" : "Preview"}
        </Button>
      </div>
      <Separator />
      <div>
        {isPreview ? (
          <Preview data={watchedValues} pluginContent={pluginContent} />
        ) : (
          <PostForm
            form={form}
            submitHandler={onSubmit}
            isFormLoading={isLoading}
            content={pluginContent}
            setContent={setPluginContent}
          />
        )}
      </div>
    </>
  );
};

export default EditForm;
