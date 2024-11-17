/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRegisterPlugin } from "@/plugins/PluginContext";
import { useEffect } from "react";

import { Plugin } from "@/types/hooks";

type VideoBlockData = {
  videoUrl: string;
};

import VideoBlockEditor from "./VideoBlockEditor";
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

const VideoPlugin: Plugin = {
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
  }
};

export const useInitializeVideoPlugin = () => {
  const registerPlugin = useRegisterPlugin();

  useEffect(() => {
    registerPlugin(VideoPlugin);
  }, [registerPlugin]);
};
