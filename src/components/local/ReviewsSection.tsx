import Link from "next/link";
import { localContent } from "@/lib/local/content";
import { ArrowIcon, GoogleIcon } from "./icons";

export function ReviewsSection() {
  const { reviews } = localContent;

  return (
    <section className="fb-section fb-reviews">
      <div className="fb-section__inner">
        <div className="fb-reviews__bar">
          <span className="fb-reviews__google-btn">
            <GoogleIcon className="h-6 w-6" />
            {reviews.googleLabel}
          </span>
          <Link href={reviews.testimonialsHref} className="fb-reviews__testimonials-link">
            <ArrowIcon className="h-5 w-5" />
            {reviews.testimonialsLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
