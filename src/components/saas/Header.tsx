'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function SaasHeader() {
  return (
    <header data-elementor-type="header" data-elementor-id="430" className="elementor elementor-430 elementor-location-header" data-elementor-post-type="elementor_library">
      <div className="elementor-element elementor-element-beaee92 e-flex e-con-boxed e-con e-parent" data-id="beaee92" data-element_type="container">
        <div className="e-con-inner">
          <div className="elementor-element elementor-element-6b034f1 elementor-widget-tablet__width-auto elementor-widget-mobile__width-auto header elementor-widget elementor-widget-theme-site-logo elementor-widget-image" data-id="6b034f1" data-element_type="widget">
            <div className="elementor-widget-container">
              <Link href="/saas">
                <Image width={175} height={46} src="/saas/images/logo.png" className="attachment-full size-full wp-image-407" alt="SAAS Template" />
              </Link>
            </div>
          </div>
          
          <div className="elementor-element elementor-element-6627d36 elementor-hidden-mobile e-n-menu-mobile e-full_width e-n-menu-layout-horizontal elementor-widget elementor-widget-n-menu" data-id="6627d36" data-element_type="widget">
            <div className="elementor-widget-container">
              <nav className="e-n-menu" data-widget-number="107" aria-label="Menu">
                <div className="e-n-menu-wrapper" id="menubar-107">
                  <ul className="e-n-menu-heading">
                    <li className="e-n-menu-item">
                      <div id="e-n-menu-title-1071" className="e-n-menu-title e-anchor">
                        <Link className="e-n-menu-title-container e-focus e-link" href="/saas#product">
                          <span className="e-n-menu-title-text">Product</span>
                        </Link>
                      </div>
                    </li>
                    <li className="e-n-menu-item">
                      <div id="e-n-menu-title-1072" className="e-n-menu-title e-anchor">
                        <Link className="e-n-menu-title-container e-focus e-link" href="/saas#tools">
                          <span className="e-n-menu-title-text">Tools</span>
                        </Link>
                      </div>
                    </li>
                    <li className="e-n-menu-item">
                      <div id="e-n-menu-title-1073" className="e-n-menu-title e-anchor">
                        <Link className="e-n-menu-title-container e-focus e-link" href="/saas#use-case">
                          <span className="e-n-menu-title-text">Use Case</span>
                        </Link>
                      </div>
                    </li>
                    <li className="e-n-menu-item">
                      <div id="e-n-menu-title-1074" className="e-n-menu-title e-anchor">
                        <Link className="e-n-menu-title-container e-focus e-link" href="/saas#faq">
                          <span className="e-n-menu-title-text">FAQ</span>
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          
          <div className="elementor-element elementor-element-9bf4387 elementor-hidden-mobile elementor-hidden-tablet elementor-widget elementor-widget-button" data-id="9bf4387" data-element_type="widget">
            <div className="elementor-widget-container">
              <div className="elementor-button-wrapper">
                <a className="elementor-button elementor-button-link elementor-size-sm" href="#">
                  <span className="elementor-button-content-wrapper">
                    <span className="elementor-button-text">See Demo</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="elementor-element elementor-element-ae294ae elementor-hidden-mobile elementor-widget elementor-widget-button" data-id="ae294ae" data-element_type="widget">
            <div className="elementor-widget-container">
              <div className="elementor-button-wrapper">
                <a className="elementor-button elementor-button-link elementor-size-sm" href="#">
                  <span className="elementor-button-content-wrapper">
                    <span className="elementor-button-text">Purchase Now</span>
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
