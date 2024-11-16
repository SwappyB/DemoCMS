/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";

import PostForm from "@/components/posts/PostForm";
import { postFormSchema } from "@/components/posts/PostFormSchema";

const CreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [pluginContent, setPluginContent] = useState<any[]>([]);

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: {}
    }
  });

  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    try {
      setIsLoading(true);

      const result = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title: values.title,
          slug: values.slug,
          content: values.content,
          pluginContent: pluginContent
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
      setIsLoading(false);
    }
  }

  return (
    <div>
      <MaxWidthWrapper className="pb-2 pt-3 sm:pb-32 lg:pt-4 xl:pt-6 lg:pb-52">
        <div className="flex flex-col gap-4">
          <p className="text-sm">Creating new post</p>
          <Separator />
          <div>
            <PostForm
              form={form}
              submitHandler={onSubmit}
              isFormLoading={isLoading}
              content={pluginContent}
              setContent={setPluginContent}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default CreatePost;
