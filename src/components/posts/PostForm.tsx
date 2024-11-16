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

import WysiwygEditor from "@/components/WYSIWYG/Editor";
import { UseFormReturn } from "react-hook-form";

type PostFormProps = {
  form: UseFormReturn<
    {
      title: string;
      slug: string;
      content?: any;
    },
    any,
    undefined
  >;
  submitHandler: any;
  isFormLoading: boolean;
};

const PostForm = ({ form, submitHandler, isFormLoading }: PostFormProps) => {
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
                  Enter a title for the new post
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

          <Button type="submit" className="w-full" disabled={isFormLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PostForm;
