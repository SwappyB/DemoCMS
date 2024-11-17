"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Plugin, HookName } from "@/types/hooks";
import React, { createContext, useContext, useState, ReactNode } from "react";

// type PluginContextType = {
//   plugins: Plugin[];
//   hooks: PluginHooks;
//   executeHook: any;
//   registerPlugin: (plugin: Plugin) => void;
// };
interface PluginManager {
  plugins: Plugin[];
  registerPlugin: (plugin: Plugin) => void;
  executeHook: (
    hookName: HookName,
    data: any,
    pluginName: string
  ) => Promise<any>;
}

const PluginContext = createContext<PluginManager | undefined>(undefined);

// const PluginContext = createContext<PluginContextType | undefined>(undefined);

export const PluginProvider = ({ children }: { children: ReactNode }) => {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  // const [hooks, setHooks] = useState<PluginHooks>({});

  const registerPlugin = (plugin: Plugin) => {
    // Prevent duplicate registration
    if (plugins.find((p) => p.name === plugin.name)) return;

    setPlugins((prev) => [...prev, plugin]);

    // const pluginHooks = plugin.hooks || {};
    // setHooks((prev) => {
    //   const newHooks: PluginHooks = { ...prev };
    //   for (const [key, value] of Object.entries(pluginHooks)) {
    //     const hookType = key as keyof PluginHooks;
    //     if (!newHooks[hookType]) newHooks[hookType] = [];
    //     newHooks[hookType] = [...(newHooks[hookType] || []), ...(value || [])];
    //   }
    //   return newHooks;
    // });
  };

  const executeHook = async (
    hookName: HookName,
    data: any,
    pluginName: string
  ): Promise<any> => {
    const plugin = plugins.find((p) => p.name === pluginName);
    if (!plugin || !plugin.hooks || !plugin.hooks[hookName]) return data;
    return plugin.hooks[hookName]!(data);
  };

  return (
    <PluginContext.Provider value={{ plugins, registerPlugin, executeHook }}>
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

export const useRegisterPlugin = () =>
  useContext(PluginContext)?.registerPlugin;

export const useExecuteHook = () => {
  const context = useContext(PluginContext);
  if (!context) {
    throw new Error("usePlugins must be used within a PluginProvider");
  }
  return context.executeHook;
};
