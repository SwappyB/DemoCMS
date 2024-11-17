/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";

import PageForm from "@/components/pages/PageForm";
import { pageFormSchema } from "@/components/pages/PageFormSchema";

import { useExecuteHook } from "@/plugins/PluginContext";

import { Preview } from "@/components/Preview";
import { Button } from "@/components/ui/button";

const CreatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [isPreview, setIsPreview] = useState(false);

  const executeHook = useExecuteHook();

  const [pluginContent, setPluginContent] = useState<any[]>([]);

  const form = useForm<z.infer<typeof pageFormSchema>>({
    resolver: zodResolver(pageFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      route: "",
      content: {}
    }
  });

  const watchedValues = form.watch();

  async function onSubmit(values: z.infer<typeof pageFormSchema>) {
    try {
      setIsLoading(true);

      // Execute "beforeSave" hooks before saving
      const processedBlocks = await Promise.all(
        pluginContent.map(async (block) => {
          const dataWithHooks = await executeHook(
            "beforeSave",
            block.data,
            block.name
          );
          return { ...block, data: dataWithHooks };
        })
      );
      const result = await fetch("/api/pages", {
        method: "POST",
        body: JSON.stringify({
          title: values.title,
          slug: values.slug,
          route: values.route,
          content: values.content,
          pluginContent: processedBlocks
        }),
        headers: { "Content-Type": "application/json" }
      });
      const res = await result.json();
      if (res.success) {
        toast({
          title: "Success",
          description: res.message
        });

        // Execute "afterSave" hooks before saving
        pluginContent.map((block) => {
          executeHook("afterSave", block.data, block.name);
        });
      } else {
        console.log(res);
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
    <div>
      <MaxWidthWrapper className="pb-2 pt-3 sm:pb-32 lg:pt-4 xl:pt-6 lg:pb-52">
        <div className="flex flex-col gap-4">
          <div className="flex  flex-row gap-10 items-center">
            <p className="text-sm">Creating new page</p>
            <Button
              variant={"outline"}
              onClick={() => setIsPreview(!isPreview)}
            >
              {isPreview ? "Back to Editor" : "Preview"}
            </Button>
          </div>
          <Separator />
          <div>
            {isPreview ? (
              <Preview data={watchedValues} pluginContent={pluginContent} />
            ) : (
              <PageForm
                form={form}
                submitHandler={onSubmit}
                isFormLoading={isLoading}
                content={pluginContent}
                setContent={setPluginContent}
              />
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default CreatePage;
