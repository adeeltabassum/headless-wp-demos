"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocalContent } from "./LocalContentProvider";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "./icons";
import { StickyBar } from "./StickyBar";

function YelpIcon() {
  return (
    <svg viewBox="0 0 384 512" aria-hidden="true">
      <path
        d="M42.9 240.32l99.62 48.61c19.2 9.4 16.2 37.51-4.5 42.71L30.5 358.45a22.79 22.79 0 0 1-28.21-19.6 197.16 197.16 0 0 1 9-85.32 22.8 22.8 0 0 1 31.61-13.21zm44 239.25a199.45 199.45 0 0 0 79.42 32.11A22.78 22.78 0 0 0 192.94 490l3.9-110.82c.7-21.3-25.5-31.91-39.81-16.1l-74.21 82.4a22.82 22.82 0 0 0 4.09 34.09zm145.34-109.92L58.6 46.1a22.28 22.28 0 0 0-3 33.91L986 227.7a11.76 11.76 0 0 0 3.8 1.88c2.4 0 4.5-.83 6.4-2.4l106.1-77.1a22.3 22.3 0 0 0 .7-35.07z"
        fill="currentColor"
      />
    </svg>
  );
}

function SocialIcon({ network }: { network: string }) {
  if (network === "facebook") return <FacebookIcon className="h-[18px] w-[18px]" />;
  if (network === "twitter") return <TwitterIcon className="h-[18px] w-[18px]" />;
  if (network === "instagram") return <InstagramIcon className="h-[18px] w-[18px]" />;
  return <YelpIcon />;
}

export function LocalFooter() {
  const content = useLocalContent();
  const { footer, logo, licenses, siteName, siteBase, aboutBlurb, social } = content;
  const year = new Date().getFullYear();

  return (
    <footer id="fb-footer-wrap" className="fb-footer-wrap">
      <div className="fb-footer">
        <StickyBar />
        <div className="fb-footer__main">
          <div className="fb-footer__brand">
            <Link href={siteBase} className="fb-footer__logo">
              <Image src={logo} alt={siteName} width={408} height={64} unoptimized={logo.endsWith(".svg")} />
            </Link>
            <p className="fb-footer__desc">{aboutBlurb}</p>
            <div className="fb-footer__social">
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="fb-footer__social-link"
                  aria-label={item.label}
                >
                  <SocialIcon network={item.network} />
                </a>
              ))}
            </div>
          </div>

          <div className="fb-footer__col">
            <h2 className="fb-footer__heading">Services</h2>
            <ul className="fb-footer__links">
              {footer.services.map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="fb-footer__col">
            <h2 className="fb-footer__heading">Company</h2>
            <ul className="fb-footer__links">
              {footer.company.map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="fb-footer__col">
            <h2 className="fb-footer__heading">Licenses</h2>
            <ul className="fb-footer__licenses">
              {licenses.map((license) => (
                <li key={license.label}>
                  <b>{license.label}</b> {license.value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="fb-footer__bottom">
          <p className="fb-footer__copyright">
            {year} © {footer.copyright}
          </p>
          <div className="fb-footer__privacy">
            <Link href={footer.privacy}>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
