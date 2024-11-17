/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { usePlugins } from "./PluginContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Plugin } from "@/types/hooks";

const RenderPluginEditorComponent = ({
  plugin,
  onAddBlock
}: {
  plugin: Plugin;
  onAddBlock: (block: any) => void;
}) => {
  const EditorComponent = plugin?.editorComponent;
  return <EditorComponent onAddBlock={onAddBlock} />;
};

const EditorToolbar: React.FC<{ onAddBlock: (block: any) => void }> = ({
  onAddBlock
}) => {
  const { plugins } = usePlugins();

  const [currPlugin, setCurrPlugin] = useState<Plugin | boolean>(false);

  const blockHandler = (data: any) => {
    setCurrPlugin(false);
    onAddBlock(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg">Plugins</div>

      {currPlugin && (
        <RenderPluginEditorComponent
          plugin={currPlugin as Plugin}
          onAddBlock={blockHandler}
        />
      )}
      <div className="flex flex-row gap-10">
        {!currPlugin &&
          plugins?.map((plugin) => (
            <Button
              variant={"outline"}
              key={plugin.name}
              type="button"
              onClick={() => {
                setCurrPlugin(plugin);
              }}
            >
              {plugin.name}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default EditorToolbar;
