import { registerPlugin } from "./pluginManager";

type VideoBlockData = {
  videoUrl: string;
};

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

// Registering the video plugin
registerPlugin({
  name: "video",
  blocks: [
    {
      type: "video",
      render: renderVideoBlock
    }
  ],
  hooks: {
    beforeSave: (args) => {
      console.log("Video Plugin: Before Save Hook", args);
    },
    afterRender: (args) => {
      console.log("Video Plugin: After Render Hook", args);
    }
  }
});
