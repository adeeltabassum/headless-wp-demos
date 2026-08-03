import { GrubGadgetHeader } from "@/components/grub-gadget/Header";
import { ArticleCard } from "@/components/grub-gadget/ArticleCard";
import { GrubGadgetSidebar } from "@/components/grub-gadget/Sidebar";
import { GrubGadgetFooter } from "@/components/grub-gadget/Footer";
import { articles } from "@/lib/grub-gadget/content";
import Link from "next/link";

export default function GrubGadgetHome() {
  return (
    <>
      <GrubGadgetHeader />
      
      <main className="gg-main">
        <div className="gg-container">
          <div className="gg-content-grid">
            <div>
              <div className="gg-articles">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              <div className="gg-pagination">
                <Link href="/grub-gadget?page=1">« Previous</Link>
                <Link href="/grub-gadget?page=2" className="next">Next »</Link>
              </div>
            </div>

            <GrubGadgetSidebar />
          </div>
        </div>
      </main>

      <GrubGadgetFooter />
    </>
  );
}
