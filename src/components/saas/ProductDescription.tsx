"use client";

import { useSaasContent } from "./SaasPreviewProvider";

const CHECK = (
  <svg
    aria-hidden="true"
    className="e-font-icon-svg e-fas-check-circle"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
  </svg>
);

export default function ProductDescription() {
  const { product, productImage } = useSaasContent();

  return (
    <div
      className="elementor-element elementor-element-eb51710 e-flex e-con-boxed e-con e-parent"
      data-id="eb51710"
      data-element_type="container"
      id="product"
      data-settings='{"background_background":"classic"}'
    >
      <div className="e-con-inner">
        <div
          className="elementor-element elementor-element-d1172e1 e-con-full e-flex elementor-invisible e-con e-child"
          data-id="d1172e1"
          data-element_type="container"
          data-settings='{"animation":"fadeInUp","animation_mobile":"fadeIn","animation_delay":50}'
        >
          <div
            className="elementor-element elementor-element-c01a0d0 elementor-widget__width-inherit elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading"
            data-id="c01a0d0"
            data-element_type="widget"
          >
            <div className="elementor-widget-container">
              <h2 className="elementor-heading-title elementor-size-default">{product.title}</h2>
            </div>
          </div>
          <div
            className="elementor-element elementor-element-22cc5f3 elementor-widget__width-initial elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading"
            data-id="22cc5f3"
            data-element_type="widget"
          >
            <div className="elementor-widget-container">
              <p className="elementor-heading-title elementor-size-default">{product.description}</p>
            </div>
          </div>
        </div>

        <div
          className="elementor-element elementor-element-bf8cc97 e-con-full e-flex elementor-invisible e-con e-child"
          data-id="bf8cc97"
          data-element_type="container"
          data-settings='{"animation":"fadeInUp","animation_delay":100}'
        >
          <div
            className="elementor-element elementor-element-ed05b59 e-con-full e-flex elementor-invisible e-con e-child"
            data-id="ed05b59"
            data-element_type="container"
            data-settings='{"animation":"fadeInLeft","animation_mobile":"fadeIn","animation_delay":100}'
          >
            <div
              className="elementor-element elementor-element-0cf926f elementor-widget__width-inherit elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading"
              data-id="0cf926f"
              data-element_type="widget"
            >
              <div className="elementor-widget-container">
                <h3 className="elementor-heading-title elementor-size-default">{product.subtitle}</h3>
              </div>
            </div>

            <div
              className="elementor-element elementor-element-fcf7179 elementor-widget__width-inherit elementor-widget-mobile__width-inherit elementor-widget elementor-widget-text-editor"
              data-id="fcf7179"
              data-element_type="widget"
            >
              <div className="elementor-widget-container">
                <p>{product.subdescription}</p>
              </div>
            </div>

            <div
              className="elementor-element elementor-element-2f9e977 elementor-widget__width-inherit elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list"
              data-id="2f9e977"
              data-element_type="widget"
            >
              <div className="elementor-widget-container">
                <ul className="elementor-icon-list-items">
                  {product.features.map((feature, index) => (
                    <li className="elementor-icon-list-item" key={`product-feature-${index}`}>
                      <span className="elementor-icon-list-icon">{CHECK}</span>
                      <span className="elementor-icon-list-text">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div
            className="elementor-element elementor-element-aa6c231 elementor-widget-mobile__width-inherit elementor-invisible elementor-widget elementor-widget-image"
            data-id="aa6c231"
            data-element_type="widget"
            data-settings='{"_animation":"fadeInRight"}'
          >
            <div className="elementor-widget-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                decoding="async"
                src={productImage}
                title=""
                alt=""
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
