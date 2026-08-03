import Link from "next/link";
import { nicheBlogContent } from "@/lib/niche-blog/content";

export function NicheBlogHero() {
  const { hero } = nicheBlogContent;

  return (
    <section className="nb-hero">
      <div className="nb-container">
        <div className="nb-hero__card">
          <div className="nb-hero__bg" style={{ backgroundImage: `url(${hero.background})` }} />
          <div className="nb-hero__overlay" />
          <div className="nb-hero__content">
            <h1 className="nb-hero__title">{hero.title}</h1>
            <Link href={hero.href} className="nb-btn">
              {hero.button}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NicheBlogCategories() {
  const { categories } = nicheBlogContent;

  return (
    <section className="nb-categories">
      <div className="nb-container">
        <div className="nb-categories__grid">
          {categories.map((cat) => (
            <Link key={cat.label} href={cat.href} className="nb-cat-card">
              <div className="nb-cat-card__bg" style={{ backgroundImage: `url(${cat.background})` }} />
              <div className="nb-cat-card__overlay" />
              <span className="nb-btn nb-cat-card__btn">{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
