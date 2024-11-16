/* eslint-disable @typescript-eslint/no-explicit-any */
export type PluginHook = {
    name: string;
    handler: (...args: any[]) => any;
};

export type PluginHooks = {
    onLoad?: PluginHook[];
    onRender?: PluginHook[];
    onSave?: PluginHook[];
};