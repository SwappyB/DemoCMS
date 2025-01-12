import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "DemoCMS",
  description: "CMS for Demo"
};
import { Toaster } from "@/components/ui/toaster";

const font = Recursive({ subsets: ["latin"] });

import { PluginProvider } from "@/plugins/PluginContext";
import PluginInit from "@/plugins";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        <main className="flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]">
          <div className="flex-1 flex flex-col h-full">
            <PluginProvider>
              <PluginInit />
              {children}
            </PluginProvider>
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
