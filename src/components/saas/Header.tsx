"use client";

import Link from "next/link";
import { useSaasContent } from "./SaasPreviewProvider";

export default function SaasHeader() {
  const content = useSaasContent();
  const home = content.siteBase || "/saas";

  return (
    <header
      data-elementor-type="header"
      data-elementor-id="430"
      className="elementor elementor-430 elementor-location-header"
      data-elementor-post-type="elementor_library"
    >
      <div
        className="elementor-element elementor-element-beaee92 e-flex e-con-boxed e-con e-parent"
        data-id="beaee92"
        data-element_type="container"
      >
        <div className="e-con-inner">
          <div
            className="elementor-element elementor-element-6b034f1 elementor-widget-tablet__width-auto elementor-widget-mobile__width-auto header elementor-widget elementor-widget-theme-site-logo elementor-widget-image"
            data-id="6b034f1"
            data-element_type="widget"
          >
            <div className="elementor-widget-container">
              <Link href={home}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  width={175}
                  height={46}
                  src={content.logo}
                  className="attachment-full size-full wp-image-407"
                  alt={content.siteName}
                />
              </Link>
            </div>
          </div>

          <div
            className="elementor-element elementor-element-6627d36 elementor-hidden-mobile e-n-menu-mobile e-full_width e-n-menu-layout-horizontal elementor-widget elementor-widget-n-menu"
            data-id="6627d36"
            data-element_type="widget"
          >
            <div className="elementor-widget-container">
              <nav className="e-n-menu" data-widget-number="107" aria-label="Menu">
                <div className="e-n-menu-wrapper" id="menubar-107">
                  <ul className="e-n-menu-heading">
                    {content.nav.map((link, i) => (
                      <li className="e-n-menu-item" key={link.href}>
                        <div id={`e-n-menu-title-107${i + 1}`} className="e-n-menu-title e-anchor">
                          <Link className="e-n-menu-title-container e-focus e-link" href={link.href}>
                            <span className="e-n-menu-title-text">{link.label}</span>
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
          </div>

          <div
            className="elementor-element elementor-element-9bf4387 elementor-hidden-mobile elementor-hidden-tablet elementor-widget elementor-widget-button"
            data-id="9bf4387"
            data-element_type="widget"
          >
            <div className="elementor-widget-container">
              <div className="elementor-button-wrapper">
                <a className="elementor-button elementor-button-link elementor-size-sm" href={`${home}#use-case`}>
                  <span className="elementor-button-content-wrapper">
                    <span className="elementor-button-text">{content.headerCta.demo}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div
            className="elementor-element elementor-element-ae294ae elementor-hidden-mobile elementor-widget elementor-widget-button"
            data-id="ae294ae"
            data-element_type="widget"
          >
            <div className="elementor-widget-container">
              <div className="elementor-button-wrapper">
                <a className="elementor-button elementor-button-link elementor-size-sm" href={`${home}#pricing`}>
                  <span className="elementor-button-content-wrapper">
                    <span className="elementor-button-text">{content.headerCta.purchase}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
