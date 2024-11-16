"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { PluginHooks } from "@/types/hooks";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type Plugin = {
  name: string;
  hooks?: PluginHooks;
  editorComponent: React.FC<{ onAddBlock: (block: any) => void }>;
  // Render logic for the block
  render: (data: any) => JSX.Element;
};

type PluginContextType = {
  plugins: Plugin[];
  hooks: PluginHooks;
  registerPlugin: (plugin: Plugin) => void;
};

const PluginContext = createContext<PluginContextType | undefined>(undefined);

export const PluginProvider = ({ children }: { children: ReactNode }) => {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [hooks, setHooks] = useState<PluginHooks>({});

  const registerPlugin = (plugin: Plugin) => {
    // Prevent duplicate registration
    if (plugins.find((p) => p.name === plugin.name)) return;

    setPlugins((prev) => [...prev, plugin]);

    const pluginHooks = plugin.hooks || {};
    setHooks((prev) => {
      const newHooks: PluginHooks = { ...prev };
      for (const [key, value] of Object.entries(pluginHooks)) {
        const hookType = key as keyof PluginHooks;
        if (!newHooks[hookType]) newHooks[hookType] = [];
        newHooks[hookType] = [...(newHooks[hookType] || []), ...(value || [])];
      }
      return newHooks;
    });
  };

  return (
    <PluginContext.Provider value={{ plugins, hooks, registerPlugin }}>
      {children}
    </PluginContext.Provider>
  );
};

export const usePlugins = () => {
  const context = useContext(PluginContext);
  if (!context) {
    throw new Error("usePlugins must be used within a PluginProvider");
  }
  return context;
};
