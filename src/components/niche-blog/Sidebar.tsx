import Link from "next/link";
import { nicheBlogContent } from "@/lib/niche-blog/content";

export function NicheBlogSidebar() {
  const { sidebar } = nicheBlogContent;

  return (
    <aside className="nb-sidebar">
      <span className="nb-widget-title">About Us</span>
      <p>{sidebar.about}</p>
      <span className="nb-widget-title second">Legal Information</span>
      <p>{sidebar.legal}</p>
      <p>
        Advertisements may use cookies. See our{" "}
        <Link href={sidebar.privacyHref}>Privacy Policy</Link>.
      </p>
      <span className="nb-widget-title second">Tags</span>
      <div className="nb-recent-placeholder">No tags yet.</div>
    </aside>
  );
}
