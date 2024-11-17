/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { usePlugins, useExecuteHook } from "@/plugins/PluginContext";

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
  const executeHook = useExecuteHook();

  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, index) => {
        const plugin = plugins.find((p) => p.name === block.name);
        const renderer = plugin?.render;

        // Execute before render hooks
        let pluginData = block.data;
        if (plugin) {
          executeHook("beforeRender", block.data, plugin?.name).then(
            (data) => (pluginData = data)
          );
        }

        return renderer ? (
          <div key={index}>{renderer(pluginData)}</div>
        ) : (
          <p key={index}>Unknown block type: {block.name}</p>
        );
      })}
    </div>
  );
};

export default RenderBlocks;
