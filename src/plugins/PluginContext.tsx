"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
export type HookType = "beforeSave" | "afterRender";
type Hook = (args: any) => void;

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Plugin = {
  name: string;
  hooks?: Partial<Record<HookType, Hook>>;
  editorComponent: React.FC<{ onAddBlock: (block: any) => void }>;
  // Render logic for the block
  render: (data: any) => JSX.Element;
};

type PluginContextType = {
  plugins: Plugin[];
  registerPlugin: (plugin: Plugin) => void;
};

const PluginContext = createContext<PluginContextType | undefined>(undefined);

export const PluginProvider = ({ children }: { children: ReactNode }) => {
  const [plugins, setPlugins] = useState<Plugin[]>([]);

  const registerPlugin = (plugin: Plugin) => {
    setPlugins((prev) => {
      if (!prev.some((p) => p.name === plugin.name)) {
        return [...prev, plugin];
      }
      return prev;
    });
  };

  return (
    <PluginContext.Provider value={{ plugins, registerPlugin }}>
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
