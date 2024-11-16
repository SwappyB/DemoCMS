/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";

import { pageFormSchema } from "@/components/pages/PageFormSchema";
import PageForm from "@/components/pages/PageForm";

import type { Page } from "@/types";

import { executeHooks } from "@/plugins/hooks";
import { usePlugins } from "@/plugins/PluginContext";

type EditPageProps = {
  data: Page | null;
};

const EditForm = ({ data }: EditPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { hooks, plugins } = usePlugins();

  const [pluginContent, setPluginContent] = useState<any[]>(
    data?.pluginContent && data?.pluginContent.length
      ? JSON.parse(data?.pluginContent)
      : []
  );

  const form = useForm<z.infer<typeof pageFormSchema>>({
    resolver: zodResolver(pageFormSchema),
    defaultValues: {
      title: data?.title,
      slug: data?.slug,
      route: data?.route,
      content: data?.content
    }
  });

  async function onSubmit(values: z.infer<typeof pageFormSchema>) {
    try {
      setIsLoading(true);

      await executeHooks(hooks, "onSave", plugins, pluginContent);

      const result = await fetch("/api/pages", {
        method: "PATCH",
        body: JSON.stringify({
          id: data?.id,
          title: values.title,
          slug: values.slug,
          route: values.route,
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
      <PageForm
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
