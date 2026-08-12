import { ContentBlocks } from "./ContentBlocks";
import { legacyStringsToBlocks } from "@/lib/builder/contentBlocks";

/** @deprecated Prefer ContentBlocks with typed blocks. Kept for any remaining string[] callers. */
export function NicheTemplateRichContent({ blocks }: { blocks: string[] }) {
  return <ContentBlocks blocks={legacyStringsToBlocks(blocks)} />;
}
