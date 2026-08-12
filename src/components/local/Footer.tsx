"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocalContent } from "./LocalContentProvider";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "./icons";
import { StickyBar } from "./StickyBar";

function YelpIcon() {
  return (
    <svg viewBox="0 0 384 512" aria-hidden="true">
      <path d="M42.9 240.32l99.62 48.61c19.2 9.4 16.2 37.51-4.5 42.71L30.5 358.45a22.79 22.79 0 0 1-28.21-19.6 197.16 197.16 0 0 1 9-85.32 22.8 22.8 0 0 1 31.61-13.21zm44 239.25a199.45 199.45 0 0 0 79.42 32.11A22.78 22.78 0 0 0 192.94 490l3.9-110.82c.7-21.3-25.5-31.91-39.81-16.1l-74.21 82.4a22.82 22.82 0 0 0 4.09 34.09zm145.34-109.92L58.6 46.1a22.28 22.28 0 0 0-3 33.91L986 227.7a11.76 11.76 0 0 0 3.8 1.88c2.4 0 4.5-.83 6.4-2.4l106.1-77.1a22.3 22.3 0 0 0 .7-35.07z" fill="currentColor" />
    </svg>
  );
}

export function LocalFooter() {
  const localContent = useLocalContent();
  const { footer, logo, licenses } = localContent;
  const year = new Date().getFullYear();

  return (
    <footer id="fb-footer-wrap" className="fb-footer-wrap">
      <div className="fb-footer">
        <StickyBar />
        <div className="fb-footer__main">
          <div className="fb-footer__brand">
            <Link href="/local" className="fb-footer__logo">
              <Image src={logo} alt="Flat Bid Moving" width={408} height={64} />
            </Link>
            <p className="fb-footer__desc">
              We are a professional residential and commercial moving company based in San Diego,
              California.
            </p>
            <div className="fb-footer__social">
              <a
                href="https://facebook.com/FlatBidMoving"
                target="_blank"
                rel="noopener noreferrer"
                className="fb-footer__social-link"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://twitter.com/FlatBidMoving"
                target="_blank"
                rel="noopener noreferrer"
                className="fb-footer__social-link"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://www.instagram.com/flatbidmoving/"
                target="_blank"
                rel="noopener noreferrer"
                className="fb-footer__social-link"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://www.yelp.com/biz/flat-bid-moving-san-diego"
                target="_blank"
                rel="noopener noreferrer"
                className="fb-footer__social-link"
                aria-label="Yelp"
              >
                <YelpIcon />
              </a>
            </div>
          </div>

          <div className="fb-footer__col">
            <h2 className="fb-footer__heading">Services</h2>
            <ul className="fb-footer__links">
              {footer.services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="fb-footer__col">
            <h2 className="fb-footer__heading">Company</h2>
            <ul className="fb-footer__links">
              {footer.company.map((item) => (
                <li key={item.href}>
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

          <div className="fb-footer__col fb-footer__asymca">
            <h2 className="fb-footer__heading">{footer.asymca.heading}</h2>
            <div className="fb-footer__asymca-box">
              <Image
                src={footer.asymca.logo}
                alt="ASYMCA"
                width={498}
                height={208}
                className="fb-footer__asymca-logo"
              />
            </div>
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
