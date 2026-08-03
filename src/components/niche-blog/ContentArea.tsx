import { NicheBlogSidebar } from "@/components/niche-blog/Sidebar";

export function NicheBlogContentArea() {
  return (
    <section className="nb-content">
      <div className="nb-container">
        <div className="nb-content__grid">
          <div>
            <span className="nb-widget-title">Recent Posts</span>
            <div className="nb-recent-placeholder">Posts will appear here.</div>
          </div>
          <NicheBlogSidebar />
        </div>
      </div>
    </section>
  );
}
