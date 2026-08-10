import { RichContent as RichContentBlocks } from "@/lib/niche-template/richContent";

export function NicheTemplateRichContent({ blocks }: { blocks: string[] }) {
  return <RichContentBlocks blocks={blocks} />;
}
