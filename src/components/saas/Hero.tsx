import Image from 'next/image';

export default function SaasHero() {
  return (
    <div className="elementor-element elementor-element-ef210cf e-flex e-con-boxed e-con e-parent" data-id="ef210cf" data-element_type="container">
      <div className="e-con-inner">
        <div className="elementor-element elementor-element-01e908f e-con-full e-flex elementor-invisible e-con e-child" data-id="01e908f" data-element_type="container" data-settings='{"animation":"fadeIn","animation_delay":100}'>
          <div className="elementor-element elementor-element-8bdc6fb elementor-widget__width-initial elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading" data-id="8bdc6fb" data-element_type="widget">
            <div className="elementor-widget-container">
              <h1 className="elementor-heading-title elementor-size-default">Lorem Ipsum Dolor Sit Amet Lorem </h1>
            </div>
          </div>
          
          <div className="elementor-element elementor-element-98f8e1c elementor-widget__width-initial elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading" data-id="98f8e1c" data-element_type="widget">
            <div className="elementor-widget-container">
              <p className="elementor-heading-title elementor-size-default">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis</p>
            </div>
          </div>
          
          <div className="elementor-element elementor-element-e6ad1f1 e-con-full e-flex e-con e-child" data-id="e6ad1f1" data-element_type="container">
            <div className="elementor-element elementor-element-f4b1aa3 main-btn elementor-mobile-align-justify elementor-widget-mobile__width-inherit elementor-widget elementor-widget-button" data-id="f4b1aa3" data-element_type="widget">
              <div className="elementor-widget-container">
                <div className="elementor-button-wrapper">
                  <a className="elementor-button elementor-button-link elementor-size-sm" href="#">
                    <span className="elementor-button-content-wrapper">
                      <span className="elementor-button-icon">
                        <svg aria-hidden="true" className="e-font-icon-svg e-fas-arrow-right" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
                      </span>
                      <span className="elementor-button-text">Purchase Now</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="elementor-element elementor-element-4273514 elementor-mobile-align-justify elementor-widget-mobile__width-inherit elementor-widget elementor-widget-button" data-id="4273514" data-element_type="widget">
              <div className="elementor-widget-container">
                <div className="elementor-button-wrapper">
                  <a className="elementor-button elementor-button-link elementor-size-sm" href="#">
                    <span className="elementor-button-content-wrapper">
                      <span className="elementor-button-icon">
                        <svg aria-hidden="true" className="e-font-icon-svg e-far-play-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M371.7 238l-176-107c-15.8-8.8-35.7 2.5-35.7 21v208c0 18.4 19.8 29.8 35.7 21l176-101c16.4-9.1 16.4-32.8 0-42zM504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256z"></path></svg>
                      </span>
                      <span className="elementor-button-text">Watch Demo</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="elementor-element elementor-element-b641ba0 elementor-invisible elementor-widget elementor-widget-heading" data-id="b641ba0" data-element_type="widget" data-settings='{"_animation":"fadeIn"}'>
          <div className="elementor-widget-container">
            <p className="elementor-heading-title elementor-size-default">One time purchase - $199</p>
          </div>
        </div>
        
        <div className="elementor-element elementor-element-6f258b5 e-con-full e-flex elementor-invisible e-con e-child" data-id="6f258b5" data-element_type="container" data-settings='{"animation":"fadeInUp","animation_delay":200}'>
          <div className="elementor-element elementor-element-bd05f9f elementor-widget elementor-widget-image" data-id="bd05f9f" data-element_type="widget">
            <div className="elementor-widget-container">
              <Image decoding="async" src="/saas/images/placeholder-hero.png" title="" alt="" loading="lazy" width={800} height={600} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
