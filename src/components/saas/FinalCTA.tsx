"use client";

import { useSaasContent } from "./SaasPreviewProvider";

export default function FinalCTA() {
  const { finalCta } = useSaasContent();

  return (
    <div
      className="elementor-element elementor-element-2728257 e-flex e-con-boxed elementor-invisible e-con e-parent"
      data-id="2728257"
      data-element_type="container"
      data-settings='{"background_background":"classic","animation":"fadeIn"}'
    >
      <div className="e-con-inner">
        <div
          className="elementor-element elementor-element-44232d7 elementor-widget elementor-widget-heading"
          data-id="44232d7"
          data-element_type="widget"
        >
          <div className="elementor-widget-container">
            <h2 className="elementor-heading-title elementor-size-default">{finalCta.title}</h2>
          </div>
        </div>
        <div
          className="elementor-element elementor-element-c367e38 elementor-widget__width-initial elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading"
          data-id="c367e38"
          data-element_type="widget"
        >
          <div className="elementor-widget-container">
            <p className="elementor-heading-title elementor-size-default">{finalCta.subtitle}</p>
          </div>
        </div>
        <div
          className="elementor-element elementor-element-6f56854 elementor-align-center main-btn elementor-widget elementor-widget-button"
          data-id="6f56854"
          data-element_type="widget"
        >
          <div className="elementor-widget-container">
            <div className="elementor-button-wrapper">
              <a className="elementor-button elementor-button-link elementor-size-sm" href={finalCta.buttonHref}>
                <span className="elementor-button-content-wrapper">
                  <span className="elementor-button-text">{finalCta.buttonText}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
