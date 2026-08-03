import Link from "next/link";
import { siteContent, popularTags } from "@/lib/grub-gadget/content";

export function GrubGadgetSidebar() {
  return (
    <aside className="gg-sidebar">
      <div className="gg-widget">
        <h3 className="gg-widget__title">ABOUT US</h3>
        <div className="gg-widget__content">
          <p>{siteContent.about}</p>
        </div>
      </div>

      <div className="gg-widget">
        <h3 className="gg-widget__title">LEGAL INFORMATION</h3>
        <div className="gg-widget__content">
          <p>{siteContent.legal}</p>
          <p>
            Advertisements may use cookies. See our{" "}
            <Link href="/grub-gadget/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </div>

      <div className="gg-widget">
        <h3 className="gg-widget__title">TAGS</h3>
        <div className="gg-tags">
          {popularTags.map((tag) => (
            <Link
              key={tag}
              href={`/grub-gadget/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
              className="gg-tag"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
