"use client";

import React from "react";
import { useInitialiseVideoPlugin } from "@/plugins/videoPlugin";

// Register and initialise new plugins here
const PluginInit = () => {
  // Keep adding plugin init functions here
  useInitialiseVideoPlugin();
  return <></>;
};

export default PluginInit;
