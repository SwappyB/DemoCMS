/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import EditorToolbar from "@/plugins/Toolbar";

import WysiwygEditor from "@/components/WYSIWYG/Editor";
import { UseFormReturn } from "react-hook-form";

import RenderBlocks from "@/plugins/RenderBlocks";

type PageFormProps = {
  form: UseFormReturn<
    {
      title: string;
      slug: string;
      route: string;
      content?: any;
    },
    any,
    undefined
  >;
  submitHandler: any;
  isFormLoading: boolean;
  content: any[];
  setContent: any;
};

const PageForm = ({
  form,
  submitHandler,
  isFormLoading,
  content,
  setContent
}: PageFormProps) => {
  const handleAddBlock = (block: any) => {
    setContent((prevContent: any) => [...prevContent, block]);
  };

  const handleRemoveBlock = (block: any) => {
    setContent((prevItems: any) =>
      prevItems.filter((item: any) => item.id !== block.id)
    );
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Enter a title for the new page
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div>
                    <Input type="text" {...field} />
                  </div>
                </FormControl>
                <FormDescription>
                  Leaving this field empty will auto generate slug.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="route"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Route</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Enter a route for the new page. Example- /home/welcome
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <WysiwygEditor
                    initialContent={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-10">
              {content?.map((block) => {
                return (
                  <div key={block.name + block.id + Math.random()}>
                    <Button
                      className="mt-2"
                      type="button"
                      variant={"link"}
                      onClick={() => {
                        handleRemoveBlock(block);
                      }}
                    >
                      Remove this plugin
                    </Button>
                    <RenderBlocks blocks={[block]} />
                  </div>
                );
              })}
            </div>

            <EditorToolbar onAddBlock={handleAddBlock} />
          </div>
          <Button type="submit" disabled={isFormLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PageForm;
