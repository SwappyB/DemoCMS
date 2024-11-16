/* eslint-disable @typescript-eslint/no-explicit-any */

import { PluginHooks } from "@/types/hooks";

import { Plugin } from "./PluginContext";

export const executeHooks = async (
    hooks: PluginHooks,
    hookType: keyof PluginHooks,
    plugins: Plugin[],
    content: any[]
): Promise<void> => {
    const hooksToExecute = hooks[hookType];
    if (!hooksToExecute) return;

    for (const block of content) {
        const plugin = plugins.find((p) => p.name === block.name);

        if (!plugin) {
            console.warn(`Plugin "${block.name}" not found.`);
            continue;
        }

        for (const hook of hooksToExecute) {
            try {
                await hook.handler(block.data);
            } catch (error) {
                console.error(`Error in plugin "${block.name}" hook "${hook.name}":`, error);
                throw error; // You can decide to handle this error or propagate it
            }
        }
    }
};