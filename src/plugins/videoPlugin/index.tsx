/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePlugins } from "@/plugins/PluginContext";
import { useEffect } from "react";

type VideoBlockData = {
  videoUrl: string;
};

import VideoBlockEditor from "./VideoBlockEditor";
import { PluginHooks } from "@/types/hooks";
import { isValidUrl } from "@/lib/utils";

export const PluginName = "Video Frame";

const renderVideoBlock = (data: VideoBlockData) => {
  return (
    <div className="video-block">
      <iframe
        width="560"
        height="315"
        src={data.videoUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
export const useInitializeVideoPlugin = () => {
  const { registerPlugin } = usePlugins();

  useEffect(() => {
    registerPlugin({
      name: PluginName,
      render: renderVideoBlock,
      editorComponent: VideoBlockEditor,
      hooks: {
        beforeSave: (data: any) => {
          console.log("Validating video URL with data:", data.videoUrl);

          if (!isValidUrl(data.videoUrl)) {
            throw new Error(`Invalid URL For Video Frame: "${data.videoUrl}"`);
          }

          return data;
        },
        beforeRender: (data: any) => {
          console.log("working on the embed");
          if (data?.videoUrl?.includes("youtube")) {
            data.videoUrl = data.videoUrl.replace("watch?v=", "embed/");
          }
          return data;
        }
      } as PluginHooks
    });
  }, [registerPlugin]);
};
