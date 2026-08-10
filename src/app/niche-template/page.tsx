import {
  NicheTemplateRoot,
  NicheTemplateHeader,
  NicheTemplateHero,
  NicheTemplateCategoryTiles,
  NicheTemplateArticleGrid,
  NicheTemplateFooter,
} from "@/components/niche-template";
import { defaultNicheTheme } from "@/lib/niche-template/theme";
import { nicheTemplateSampleContent as content } from "@/lib/niche-template/sample-content";

export default function NicheTemplateHome() {
  return (
    <NicheTemplateRoot theme={defaultNicheTheme}>
      <NicheTemplateHeader content={content} />
      <main>
        <NicheTemplateHero content={content} />
        <NicheTemplateCategoryTiles content={content} />
        <NicheTemplateArticleGrid content={content} basePath="/niche-template/article" />
      </main>
      <NicheTemplateFooter content={content} />
    </NicheTemplateRoot>
  );
}
