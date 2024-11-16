/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

import { PluginName } from ".";

const VideoBlockEditor: React.FC<{ onAddBlock: (block: any) => void }> = ({
  onAddBlock
}) => {
  const [videoUrl, setVideoUrl] = useState("");

  const handleAddVideo = () => {
    if (videoUrl.trim()) {
      onAddBlock({
        name: PluginName,
        data: { videoUrl }
      });
      setVideoUrl("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter video URL"
        className="input"
      />
      <button onClick={handleAddVideo} className="btn">
        Add Video
      </button>
    </div>
  );
};

export default VideoBlockEditor;
