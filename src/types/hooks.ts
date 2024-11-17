/* eslint-disable @typescript-eslint/no-explicit-any */
export type HookName = "beforeSave" | "afterSave" | "beforeRender";

export type PluginHook = (data: any, context?: any) => any;

export type PluginHooks = {
    beforeRender?: PluginHook;
    onSave?: PluginHook;
    afterSave?: PluginHook;
};

export interface Plugin {
    name: string;
    editorComponent: React.FC<{ onAddBlock: (block: any) => void }>;
    render: (data: any) => JSX.Element;
    hooks?: Partial<Record<HookName, PluginHook>>;
}