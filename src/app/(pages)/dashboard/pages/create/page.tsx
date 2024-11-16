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

import { executeHooks } from "@/plugins/hooks";
import { usePlugins } from "@/plugins/PluginContext";

const CreatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [pluginContent, setPluginContent] = useState<any[]>([]);

  const { hooks, plugins } = usePlugins();

  const form = useForm<z.infer<typeof pageFormSchema>>({
    resolver: zodResolver(pageFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      route: "",
      content: {}
    }
  });

  async function onSubmit(values: z.infer<typeof pageFormSchema>) {
    try {
      setIsLoading(true);

      await executeHooks(hooks, "onSave", plugins, pluginContent);

      const result = await fetch("/api/pages", {
        method: "POST",
        body: JSON.stringify({
          title: values.title,
          slug: values.slug,
          route: values.route,
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
          <p className="text-sm">Creating new page</p>
          <Separator />
          <div>
            <PageForm
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

export default CreatePage;
