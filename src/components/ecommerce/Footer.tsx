"use client";

import { EcommerceLink as Link } from "@/components/ecommerce/ui/EcommerceLink";
import type { EcommerceSocialLink } from "@/lib/ecommerce/content";
import { useEcommerceContent } from "./EcommerceContentProvider";

function SocialIcon({ network }: { network: EcommerceSocialLink["network"] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (network) {
    case "facebook":
      return (
        <svg {...common}>
          <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...common}>
          <path d="M4 4l6.5 8.2L4.3 20H6.8l4.6-5.6L16.2 20H20l-6.8-8.5L19.5 4H17l-4.3 5.2L8 4H4z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M6.5 9.5v9M6.5 6.2v.2" />
          <path d="M10.5 18.5v-5.2c0-1.4.7-2.3 1.9-2.3 1.1 0 1.6.8 1.6 2.3v5.2M15.5 18.5v-5.8c0-2.6 1.4-3.7 3.2-3.7 1.5 0 2.3.8 2.3 2.8v6.7" />
        </svg>
      );
  }
}

export function EcommerceFooter() {
  const { footer, siteBase } = useEcommerceContent();

  return (
    <footer className="ec-footer" id="contact">
      <div className="ec-container ec-footer__grid">
        <div className="ec-footer__brand">
          <Link className="ec-logo" href={siteBase}>
            {footer.logoLabel}
          </Link>
          <p>{footer.blurb}</p>
          <div className="ec-social">
            {footer.social.map((item) => (
              <Link
                key={item.network}
                className="ec-social__link"
                href={item.href}
                aria-label={item.label}
              >
                <SocialIcon network={item.network} />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4>Navigation</h4>
          <ul className="ec-footer__links">
            {footer.navigation.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul className="ec-footer__links">
            {footer.pages.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul className="ec-footer__contact">
            <li>{footer.contact.email}</li>
            <li>{footer.contact.address}</li>
            <li>{footer.contact.phone}</li>
          </ul>
        </div>
      </div>
      <div className="ec-container ec-footer__bottom">
        <p>{footer.copyright}</p>
        <div className="ec-footer__legal">
          {footer.legal.map((item, i) => (
            <span key={item.label} style={{ display: "contents" }}>
              {i > 0 ? <span aria-hidden="true">|</span> : null}
              <Link href={item.href}>{item.label}</Link>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
