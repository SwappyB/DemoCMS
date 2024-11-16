/* eslint-disable @typescript-eslint/no-explicit-any */
export type HookType = "beforeSave" | "afterRender";
type Hook = (args: any) => void;

export type PluginBlock = {
    // Unique block type identifier
    type: string;
    // Render logic for the block
    render: (data: any) => JSX.Element;
};

export type Plugin = {
    name: string;
    hooks?: Partial<Record<HookType, Hook>>;
    blocks?: PluginBlock[];
};

const plugins: Plugin[] = [];

/**
 * Register a new plugin.
 * @param plugin - Plugin definition.
 */
export const registerPlugin = (plugin: Plugin) => {
    if (plugins.find((p) => p.name === plugin.name)) {
        throw new Error(`Plugin "${plugin.name}" is already registered.`);
    }
    plugins.push(plugin);
    console.log(`Plugin registered: ${plugin.name}`);
};

/**
 * Get all registered plugins.
 */
export const getPlugins = () => plugins;

/**
 * Execute hooks for a specific event.
 * @param hookType The type of hook
 * @param args Arguments to pass to the hook.
 */
export const executeHooks = (hookType: HookType, args: any) => {
    plugins.forEach((plugin) => {
        const hook = plugin.hooks?.[hookType];
        if (hook) {
            hook(args);
        }
    });
};