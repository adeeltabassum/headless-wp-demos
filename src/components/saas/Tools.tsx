"use client";

import { useSaasContent } from "./SaasPreviewProvider";

const TOOL_SLOTS = [
  { id: "17a4c5f", delay: 0 },
  { id: "711eabb", delay: 200 },
  { id: "ecbea79", delay: 400 },
  { id: "1de41fa", delay: 600 },
  { id: "326dff6", delay: 800 },
  { id: "137dad4", delay: 1000 },
] as const;

const TOOL_SVG = (
  <svg
    aria-hidden="true"
    className="e-font-icon-svg e-fas-tools"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M501.1 395.7L384 278.6c-23.1-23.1-57.6-27.6-85.4-13.9L192 158.1V96L64 0 0 64l96 128h62.1l106.6 106.6c-13.6 27.8-9.2 62.3 13.9 85.4l117.1 117.1c14.6 14.6 38.2 14.6 52.7 0l52.7-52.7c14.5-14.6 14.5-38.2 0-52.7zM331.7 225c28.3 0 54.9 11 74.9 31l19.4 19.4c15.8-6.9 30.8-16.5 43.8-29.5 37.1-37.1 49.7-89.3 37.9-136.7-2.2-9-13.5-12.1-20.1-5.5l-74.4 74.4-67.9-11.3L334 98.9l74.4-74.4c6.6-6.6 3.4-17.9-5.7-20.2-47.4-11.7-99.6.9-136.6 37.9-28.5 28.5-41.9 66.1-41.2 103.6l82.1 82.1c8.1-1.9 16.5-2.9 24.7-2.9zm-103.9 82l-56.7-56.7L18.7 402.8c-25 25-25 65.5 0 90.5s65.5 25 90.5 0l123.6-123.6c-7.6-19.9-9.9-41.6-5-62.7zM64 472c-13.2 0-24-10.8-24-24 0-13.3 10.7-24 24-24s24 10.7 24 24c0 13.2-10.7 24-24 24z"></path>
  </svg>
);

export default function Tools() {
  const content = useSaasContent();
  const tools = content.tools.slice(0, 6);

  return (
    <div
      className="elementor-element elementor-element-73a25b5 e-flex e-con-boxed e-con e-parent"
      data-id="73a25b5"
      data-element_type="container"
      id="tools"
    >
      <div className="e-con-inner">
        <div
          className="elementor-element elementor-element-5e84e0e e-con-full e-flex elementor-invisible e-con e-child"
          data-id="5e84e0e"
          data-element_type="container"
          data-settings='{"animation":"fadeInUp","animation_mobile":"fadeIn","animation_delay":50}'
        >
          <div
            className="elementor-element elementor-element-87898a2 elementor-widget__width-inherit elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading"
            data-id="87898a2"
            data-element_type="widget"
          >
            <div className="elementor-widget-container">
              <h2 className="elementor-heading-title elementor-size-default">{content.toolsHeading}</h2>
            </div>
          </div>
          <div
            className="elementor-element elementor-element-7b9fe75 elementor-widget__width-initial elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading"
            data-id="7b9fe75"
            data-element_type="widget"
          >
            <div className="elementor-widget-container">
              <p className="elementor-heading-title elementor-size-default">{content.toolsSubheading}</p>
            </div>
          </div>
        </div>

        <div
          className="elementor-element elementor-element-6424a7b e-con-full e-grid e-con e-child"
          data-id="6424a7b"
          data-element_type="container"
        >
          {TOOL_SLOTS.map((slot, index) => {
            const tool = tools[index] || content.tools[0];
            const settings =
              slot.delay > 0
                ? `{"_animation":"fadeInUp","_animation_delay":${slot.delay}}`
                : '{"_animation":"fadeInUp"}';
            return (
              <div
                key={slot.id}
                className={`elementor-element elementor-element-${slot.id} elementor-widget-mobile__width-inherit elementor-view-default elementor-position-top elementor-mobile-position-top elementor-invisible elementor-widget elementor-widget-icon-box`}
                data-id={slot.id}
                data-element_type="widget"
                data-settings={settings}
              >
                <div className="elementor-widget-container">
                  <div className="elementor-icon-box-wrapper">
                    <div className="elementor-icon-box-icon">
                      <span className="elementor-icon">{TOOL_SVG}</span>
                    </div>
                    <div className="elementor-icon-box-content">
                      <h3 className="elementor-icon-box-title">
                        <span>{tool.title}</span>
                      </h3>
                      <p className="elementor-icon-box-description">{tool.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
