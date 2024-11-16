"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePlugins } from "@/plugins/PluginContext";

type Block = {
  name: string;
  data: any;
};

/**
 * Rendering plugin blocks
 * @param param0 blocks = content blocks for the plugin
 * @returns Html for the plugin blocks
 */
const RenderBlocks = ({ blocks }: { blocks: Block[] }) => {
  const { plugins } = usePlugins();

  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, index) => {
        const plugin = plugins.find((p) => p.name === block.name);
        const renderer = plugin?.render;
        return renderer ? (
          <div key={index}>{renderer(block.data)}</div>
        ) : (
          <p key={index}>Unknown block type: {block.name}</p>
        );
      })}
    </div>
  );
};

export default RenderBlocks;
