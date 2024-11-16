/* eslint-disable @typescript-eslint/no-explicit-any */
import { executeHooks } from "./pluginManager";

/**
 * Trigger a "beforeSave" hook.
 * @param args - Arguments to pass to the hook.
 */
export const triggerBeforeSaveHook = (args: any) => {
    executeHooks("beforeSave", args);
};

/**
 * Trigger an "afterRender" hook.
 * @param args - Arguments to pass to the hook.
 */
export const triggerAfterRenderHook = (args: any) => {
    executeHooks("afterRender", args);
};