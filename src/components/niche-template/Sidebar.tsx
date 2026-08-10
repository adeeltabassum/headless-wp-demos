import { NicheLink } from "./NicheLink";
import type { NicheTemplateContent } from "@/lib/niche-template/content";

function tagSlug(tag: string) {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

export function NicheTemplateSidebar({
  content,
  basePath = "",
}: {
  content: NicheTemplateContent;
  basePath?: string;
}) {
  const { sidebar } = content;

  return (
    <aside className="nt-sidebar">
      <div className="nt-widget">
        <span className="nt-widget__title">About Us</span>
        <p>{sidebar.about}</p>
      </div>

      <div className="nt-widget">
        <span className="nt-widget__title">Legal Information</span>
        <p>{sidebar.legal}</p>
        <p>
          Advertisements may use cookies. See our{" "}
          <NicheLink href={sidebar.privacyHref}>Privacy Policy</NicheLink>.
        </p>
      </div>

      {sidebar.tags.length > 0 && (
        <div className="nt-widget">
          <span className="nt-widget__title">Tags</span>
          <div className="nt-tags">
            {sidebar.tags.map((tag) => (
              <NicheLink key={tag} href={`${basePath}/tag/${tagSlug(tag)}`} className="nt-tag">
                {tag}
              </NicheLink>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
