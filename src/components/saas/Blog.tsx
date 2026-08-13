"use client";

import { useSaasContent } from "./SaasPreviewProvider";

const BLOG_IDS = [4831, 4569, 3651] as const;

export default function Blog() {
  const { blogPosts, blogHeading, blogSubheading } = useSaasContent();

  return (
    <div
      className="elementor-element elementor-element-9cb2d2c e-flex e-con-boxed e-con e-parent"
      data-id="9cb2d2c"
      data-element_type="container"
      data-settings='{"background_background":"classic"}'
    >
      <div className="e-con-inner">
        <div
          className="elementor-element elementor-element-f6a33b3 e-con-full e-flex elementor-invisible e-con e-child"
          data-id="f6a33b3"
          data-element_type="container"
          data-settings='{"animation":"fadeInUp","animation_delay":50}'
        >
          <div
            className="elementor-element elementor-element-7464b53 elementor-widget elementor-widget-heading"
            data-id="7464b53"
            data-element_type="widget"
          >
            <div className="elementor-widget-container">
              <h2 className="elementor-heading-title elementor-size-default">{blogHeading}</h2>
            </div>
          </div>
          <div
            className="elementor-element elementor-element-15a1292 elementor-widget__width-initial elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading"
            data-id="15a1292"
            data-element_type="widget"
          >
            <div className="elementor-widget-container">
              <p className="elementor-heading-title elementor-size-default">{blogSubheading}</p>
            </div>
          </div>
        </div>

        <div
          className="elementor-element elementor-element-dd8780a elementor-grid-3 elementor-grid-tablet-2 elementor-grid-mobile-1 elementor-widget elementor-widget-loop-grid"
          data-id="dd8780a"
          data-element_type="widget"
          data-widget_type="loop-grid.post"
        >
          <div className="elementor-widget-container">
            <div className="elementor-loop-container elementor-grid" role="list">
              {BLOG_IDS.map((numericId, index) => {
                const post = blogPosts[index] || blogPosts[0];
                const href = post.href || "#";
                return (
                  <div
                    key={numericId}
                    data-elementor-type="loop-item"
                    data-elementor-id="4822"
                    className={`elementor elementor-4822 e-loop-item e-loop-item-${numericId} post-${numericId} post type-post status-publish format-standard has-post-thumbnail hentry`}
                    data-elementor-post-type="elementor_library"
                  >
                    <div
                      className="elementor-element elementor-element-9922336 e-flex e-con-boxed e-con e-child"
                      data-id="9922336"
                      data-element_type="container"
                    >
                      <div className="e-con-inner">
                        <a
                          className="elementor-element elementor-element-157ae4a e-flex e-con-boxed e-con e-child"
                          data-id="157ae4a"
                          data-element_type="container"
                          href={href}
                        >
                          <div className="e-con-inner">
                            <div
                              className="elementor-element elementor-element-970ec03 elementor-widget elementor-widget-post-info"
                              data-id="970ec03"
                              data-element_type="widget"
                            >
                              <div className="elementor-widget-container">
                                <ul className="elementor-inline-items elementor-icon-list-items elementor-post-info">
                                  <li className="elementor-icon-list-item elementor-repeater-item-8241718 elementor-inline-item">
                                    <span className="elementor-icon-list-text elementor-post-info__item elementor-post-info__item--type-terms">
                                      <span className="elementor-post-info__terms-list">
                                        <span className="elementor-post-info__terms-list-item">
                                          {post.category || "Update"}
                                        </span>
                                      </span>
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div
                              className="elementor-element elementor-element-2b6d795 elementor-widget elementor-widget-image"
                              data-id="2b6d795"
                              data-element_type="widget"
                            >
                              <div className="elementor-widget-container">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  decoding="async"
                                  width={800}
                                  height={534}
                                  src={post.image || "/saas/images/placeholder-blog.png"}
                                  className="attachment-large size-large wp-image-3990"
                                  alt={post.title}
                                />
                              </div>
                            </div>
                          </div>
                        </a>
                        <div
                          className="elementor-element elementor-element-6090bf7 e-con-full e-flex e-con e-child"
                          data-id="6090bf7"
                          data-element_type="container"
                          data-settings='{"background_background":"classic"}'
                        >
                          <a
                            className="elementor-element elementor-element-3dcbd3c e-con-full e-flex e-con e-child"
                            data-id="3dcbd3c"
                            data-element_type="container"
                            href={href}
                          >
                            <div
                              className="elementor-element elementor-element-f574129 elementor-widget elementor-widget-heading"
                              data-id="f574129"
                              data-element_type="widget"
                            >
                              <div className="elementor-widget-container">
                                <h2 className="elementor-heading-title elementor-size-default">{post.title}</h2>
                              </div>
                            </div>
                            <div
                              className="elementor-element elementor-element-aee9fcc elementor-widget elementor-widget-text-editor"
                              data-id="aee9fcc"
                              data-element_type="widget"
                            >
                              <div className="elementor-widget-container">{post.excerpt}</div>
                            </div>
                          </a>
                          <div
                            className="elementor-element elementor-element-48df3bb elementor-align-left elementor-widget elementor-widget-button"
                            data-id="48df3bb"
                            data-element_type="widget"
                          >
                            <div className="elementor-widget-container">
                              <div className="elementor-button-wrapper">
                                <a className="elementor-button elementor-button-link elementor-size-sm" href={href}>
                                  <span className="elementor-button-content-wrapper">
                                    <span className="elementor-button-icon">
                                      <svg
                                        aria-hidden="true"
                                        className="e-font-icon-svg e-fas-angle-right"
                                        viewBox="0 0 256 512"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path>
                                      </svg>
                                    </span>
                                    <span className="elementor-button-text">Read more</span>
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="elementor-element elementor-element-d46b8d1 elementor-align-center elementor-mobile-align-center elementor-widget__width-initial elementor-widget-mobile__width-inherit elementor-widget elementor-widget-button"
          data-id="d46b8d1"
          data-element_type="widget"
        >
          <div className="elementor-widget-container">
            <div className="elementor-button-wrapper">
              <a className="elementor-button elementor-button-link elementor-size-sm" href="#">
                <span className="elementor-button-content-wrapper">
                  <span className="elementor-button-text">View All Blogs</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
