import {
  NicheTemplateRoot,
  NicheTemplateHeader,
  NicheTemplateHero,
  NicheTemplateCategoryTiles,
  NicheTemplateArticleGrid,
  NicheTemplateFooter,
} from "@/components/niche-template";
import { PetGroomingTheme as theme } from "@/lib/sites/pet-grooming/theme";
import { PetGroomingContent as content } from "@/lib/sites/pet-grooming/content";

export default function PetGroomingHome() {
  return (
    <NicheTemplateRoot theme={theme}>
      <NicheTemplateHeader content={content} />
      <main>
        <NicheTemplateHero content={content} />
        <NicheTemplateCategoryTiles content={content} />
        <NicheTemplateArticleGrid content={content} basePath="/pet-grooming/article" />
      </main>
      <NicheTemplateFooter content={content} />
    </NicheTemplateRoot>
  );
}
