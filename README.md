# Setting Up the DemoCMS Locally

This guide will help you set up the CMS with the plugin system locally using **Next.js (App Router)**, **Prisma with PostgreSQL**, **TypeScript**, and a modular plugin architecture.

## **1. Prerequisites**

Before starting, ensure you have the following installed:

- **Node.js** (v20+ recommended)  
  [Download Node.js](https://nodejs.org)
- **npm** or **yarn** (comes with Node.js)
- **PostgreSQL** (Ensure the database server is running)  
  [Install PostgreSQL](https://www.postgresql.org/download/)
- **Git**  
  [Install Git](https://git-scm.com/)

## **2. Clone the Repository**

Clone the CMS repository from GitHub:

    git clone <REPO_URL> cms-demo
    cd cms-demo

---

## **3. Install Dependencies**

Install all necessary dependencies using npm or yarn:

    npm install
    # or
    yarn install

## **4. Set Up Environment Variables**

Create an `.env` file in the root directory. Configure the following environment variables:

    DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database>"
    NEXT_PUBLIC_BASE_URL="http://localhost:3000"

Replace `<username>`, `<password>`, and `<database>` with your PostgreSQL credentials.

## **5. Set Up the Database**

### **Initialise Prisma**

Run the following command to generate Prisma client:

    npx prisma generate

### **Migrate the Database**

Apply the database migrations defined in the Prisma schema:

    npx prisma migrate dev --name init

This will create the necessary tables for posts and pages.

## **6. Run the Development Server**

Start the development server:

    npm run dev # or yarn dev

The app will run at http://localhost:3000

## **7. Add Your First Plugin**

Let's create a new Image plugin.

### **Register a Plugin**

To add a plugin, go to the `plugins` folder and create a new folder `imagePlugin`, and create `index.tsx` file in it.

    "use client";
    import { useRegisterPlugin } from "@/plugins/PluginContext";
    import { useEffect } from "react";
    import { Plugin } from "@/types/hooks";
    import Image from "next/image";

    type ImageBlockData = {
      url: string;
      alt: string;
    };

    import ImagePluginEditor from "./ImagePluginEditor";
    export const PluginName = "Image";

    const renderImageBlock = (data: ImageBlockData) => {
      return (
        <>
          <Image
            src={data.url}
            alt={data.alt || "Image"}
            width={500}
            height={500}
          />
        </>
      );
    };

    // Creating image plugin
    const ImagePlugin: Plugin = {
      name: PluginName,
      render: renderImageBlock,
      editorComponent: ImagePluginEditor,
      hooks: {
        beforeSave: (data) => {
          if (!data.url) {
            throw new Error("Image URL is required.");
          }
          return data;
        }
      }
    };

We also need to create an image plugin editor.

    "use client";

    import { useState } from "react";
    import { PluginName } from ".";
    import { generateRandomId } from "@/lib/utils";

    const ImagePluginEditor: React.FC<{ onAddBlock: (block: any) => void }> = ({
      onAddBlock
    }) => {
      const [imgUrl, setImgUrl] = useState("");
      const [imgAlt, setImgAlt] = useState("");

      const handleAddImage = () => {
        if (imgUrl.trim()) {
          onAddBlock({
            id: generateRandomId(),
            name: PluginName,
            data: { url: imgUrl, alt: imgAlt }
          });
          setImgUrl("");
        }
      };

      return (
        <div>
          <input
            type="text"
            placeholder="Enter Image URL"
            value={imgUrl || ""}
            onChange={(e) => setImgUrl(e.target.value)}
            style={{ marginBottom: "10px", width: "100%" }}
          />
          <input
            type="text"
            placeholder="Enter Alt Text"
            value={imgAlt || ""}
            onChange={(e) => setImgAlt(e.target.value)}
            style={{ marginBottom: "10px", width: "100%" }}
          />
          <button onClick={handleAddImage} type="button">
            Add Image
          </button>
        </div>
      );
    };

    export default ImagePluginEditor;

### Register the plugin

To register this plugin in your CMS, use the `useRegisterPlugin` hook.

Add this code in the `index.tsx` file in `imagePlugin` folder.

    export const useInitialiseImagePlugin = () => {
    const registerPlugin = useRegisterPlugin();

      useEffect(() => {
        registerPlugin(ImagePlugin);
      }, [registerPlugin]);
    };

To auto initialise plugin, add the plugin in `plugins/index.tsx`

    "use client";

    import React from "react";
    import { useInitialiseVideoPlugin } from "@/plugins/videoPlugin";
    import { useInitialiseImagePlugin } from "@/plugins/imagePlugin";

    // Register and initialise new plugins here
    const PluginInit = () => {
      // Keep adding plugin init functions here
      useInitialiseVideoPlugin();
      useInitialiseImagePlugin();
      return <></>;
    };

    export default PluginInit;

### Hooks for Image Viewer Plugin

- **`beforeSave`**: Ensures the image URL is not empty before saving.
- **`beforeRender`** (optional): Can be added if further processing (e.g., lazy loading) is needed before rendering.

### Next Image Error

Next.js throws error if we don't have the domain of the image url not saved in the config. You can always add the domain in the `next.config.ts`

    import type { NextConfig } from "next";

    const nextConfig: NextConfig = {
      images: {
        domains: ['image.example.com'],
      },
    };

    export default nextConfig;

## **8. Create a Post**

Navigate to the `/dashboard/posts/create` route in your app:

1.  Add a title and content for the post.
2.  Use the WYSIWYG editor to add rich content.
3.  Select and add any registered Plugins.
4.  Save the post to see it rendered on the front-end.

## **9. Preview Posts**

To preview a post before publishing, click the **Preview** button in the editor. This feature allows you to render the current draft in a live preview mode.

---

## **10. Extend with Future Plugins**

The plugin system is designed for modularity:

- Add new content blocks by creating plugins with `editorComponent` and `render` functions.
- Use hooks like `beforeSave` and `beforeRender` to customise behaviour.

Refer to the [plugin documentation](https://docs.google.com/document/d/1yYDSd012CP5wZCwtQFww27xYYC59MQu2_c5X_SJuOPM/edit?usp=sharing) for details.

## 11. Debugging Tips

- **Database Errors:** Check the `.env` configuration and ensure the PostgreSQL database is running.

## 12. Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
