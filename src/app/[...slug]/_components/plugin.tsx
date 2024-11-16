"use client";

import React from "react";
import { useInitializeVideoPlugin } from "@/plugins/videoPlugin";

const PluginInit = () => {
  useInitializeVideoPlugin();
  return <></>;
};

export default PluginInit;
