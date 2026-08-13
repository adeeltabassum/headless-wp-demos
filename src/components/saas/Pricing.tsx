"use client";

import { useSaasContent } from "./SaasPreviewProvider";

const CHECK = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
    <path d="m9 11 3 3L22 4"></path>
  </svg>
);

export default function Pricing() {
  const { pricing, siteBase } = useSaasContent();

  return (
    <div
      className="elementor-element elementor-element-343363e e-flex e-con-boxed e-con e-parent"
      data-id="343363e"
      data-element_type="container"
      id="pricing"
      data-settings='{"background_background":"classic"}'
    >
      <div className="e-con-inner">
        <div
          className="elementor-element elementor-element-cf5ea72 elementor-widget__width-inherit elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading"
          data-id="cf5ea72"
          data-element_type="widget"
        >
          <div className="elementor-widget-container">
            <h2 className="elementor-heading-title elementor-size-default">{pricing.title}</h2>
          </div>
        </div>
        <div
          className="elementor-element elementor-element-9813984 elementor-widget__width-initial elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading"
          data-id="9813984"
          data-element_type="widget"
        >
          <div className="elementor-widget-container">
            <p className="elementor-heading-title elementor-size-default">{pricing.description}</p>
          </div>
        </div>

        <div
          className="elementor-element elementor-element-ff80165 e-con-full e-flex elementor-invisible e-con e-child"
          data-id="ff80165"
          data-element_type="container"
          data-settings='{"background_background":"classic","animation":"fadeInUp"}'
        >
          <div
            className="elementor-element elementor-element-898f939 elementor-widget__width-auto elementor-widget-mobile__width-auto elementor-widget elementor-widget-heading"
            data-id="898f939"
            data-element_type="widget"
          >
            <div className="elementor-widget-container">
              <p className="elementor-heading-title elementor-size-default">{pricing.productName}</p>
            </div>
          </div>
          <div
            className="elementor-element elementor-element-9320752 elementor-widget elementor-widget-heading"
            data-id="9320752"
            data-element_type="widget"
          >
            <div className="elementor-widget-container">
              <p className="elementor-heading-title elementor-size-default">{pricing.price}</p>
            </div>
          </div>
          <div
            className="elementor-element elementor-element-9636e3c elementor-widget__width-inherit elementor-widget-mobile__width-inherit elementor-widget elementor-widget-text-editor"
            data-id="9636e3c"
            data-element_type="widget"
          >
            <div className="elementor-widget-container">
              <p>{pricing.priceDescription}</p>
            </div>
          </div>
          <div
            className="elementor-element elementor-element-b8a6fd7 elementor-align-justify elementor-widget__width-initial elementor-widget elementor-widget-button"
            data-id="b8a6fd7"
            data-element_type="widget"
          >
            <div className="elementor-widget-container">
              <div className="elementor-button-wrapper">
                <a className="elementor-button elementor-button-link elementor-size-sm" href={`${siteBase}#pricing`}>
                  <span className="elementor-button-content-wrapper">
                    <span className="elementor-button-text">{pricing.cta}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div
            className="elementor-element elementor-element-8a68cf4 elementor-widget__width-inherit elementor-widget-mobile__width-inherit elementor-widget elementor-widget-text-editor"
            data-id="8a68cf4"
            data-element_type="widget"
          >
            <div className="elementor-widget-container">
              <p>{pricing.guarantee}</p>
            </div>
          </div>
          <div
            className="elementor-element elementor-element-e84d3f8 elementor-widget__width-inherit elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading"
            data-id="e84d3f8"
            data-element_type="widget"
          >
            <div className="elementor-widget-container">
              <p className="elementor-heading-title elementor-size-default">What&apos;s included</p>
            </div>
          </div>
          <div
            className="elementor-element elementor-element-34015f8 e-con-full e-flex e-con e-child"
            data-id="34015f8"
            data-element_type="container"
          >
            <div
              className="elementor-element elementor-element-2fd1dfa elementor-widget__width-inherit elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list"
              data-id="2fd1dfa"
              data-element_type="widget"
            >
              <div className="elementor-widget-container">
                <ul className="elementor-icon-list-items">
                  {pricing.features.map((f, index) => (
                    <li className="elementor-icon-list-item" key={`pricing-feature-${index}`}>
                      <span className="elementor-icon-list-icon">{CHECK}</span>
                      <span className="elementor-icon-list-text">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className="elementor-element elementor-element-e3134c0 elementor-widget__width-inherit elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list"
              data-id="e3134c0"
              data-element_type="widget"
            >
              <div className="elementor-widget-container">
                <ul className="elementor-icon-list-items">
                  {pricing.additionalFeatures.map((f, index) => (
                    <li className="elementor-icon-list-item" key={`pricing-extra-${index}`}>
                      <span className="elementor-icon-list-icon">{CHECK}</span>
                      <span className="elementor-icon-list-text">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
