// "use client";

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { usePlugins } from "@/plugins/PluginContext";

// type Block = {
//   type: string;
//   data: any;
// };

// /**
//  * Rendering plugin blocks
//  * @param param0 blocks = content blocks for the plugin
//  * @returns Html for the plugin blocks
//  */
// const RenderBlocks = ({ blocks }: { blocks: Block[] }) => {
//   const { plugins } = usePlugins();

//   return (
//     <div>
//       {blocks.map((block, index) => {
//         const plugin = plugins.find((p) =>
//           p.blocks?.find((b) => b.type === block.type)
//         );
//         const renderer = plugin?.blocks?.find(
//           (b) => b.type === block.type
//         )?.render;

//         return renderer ? (
//           <div key={index}>{renderer(block.data)}</div>
//         ) : (
//           <p key={index}>Unknown block type: {block.type}</p>
//         );
//       })}
//     </div>
//   );
// };

// export default RenderBlocks;
