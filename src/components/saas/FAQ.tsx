'use client';

import { useEffect, useRef } from 'react';

const faqs = [
  { id: 5640, contentId: 'dee5221', headingId: '0218b9d', question: 'Vel adipiscing enim magnis?', answer: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor.' },
  { id: 5641, contentId: '6c09af6', headingId: '47c9b05', question: 'Vel adipiscing enim magnis?', answer: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor.' },
  { id: 5642, contentId: 'ab93070', headingId: 'bc36a8a', question: 'Vel adipiscing enim magnis?', answer: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor.' },
  { id: 5643, contentId: '1cf0821', headingId: 'f7b8af9', question: 'Vel adipiscing enim magnis?', answer: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor.' },
  { id: 5644, contentId: '6751bc4', headingId: 'e42f3ee', question: 'Vel adipiscing enim magnis?', answer: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor.' },
];

export default function FAQ() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLDetailsElement>('details.e-n-accordion-item'));

    const sync = (details: HTMLDetailsElement) => {
      const summary = details.querySelector('summary');
      if (summary) {
        summary.setAttribute('aria-expanded', details.open ? 'true' : 'false');
      }
    };

    const onToggle = (event: Event) => {
      const current = event.currentTarget as HTMLDetailsElement;
      if (current.open) {
        items.forEach((item) => {
          if (item !== current) item.open = false;
        });
      }
      items.forEach(sync);
    };

    items.forEach((item) => {
      sync(item);
      item.addEventListener('toggle', onToggle);
    });

    return () => {
      items.forEach((item) => item.removeEventListener('toggle', onToggle));
    };
  }, []);

  return (
    <div className="elementor-element elementor-element-f27caac e-flex e-con-boxed e-con e-parent" data-id="f27caac" data-element_type="container" id="faq">
      <div className="e-con-inner">
        <div className="elementor-element elementor-element-8d7c43e e-con-full e-flex elementor-invisible e-con e-child" data-id="8d7c43e" data-element_type="container" data-settings='{"animation":"fadeInUp","animation_delay":50}'>
          <div className="elementor-element elementor-element-378d043 elementor-widget elementor-widget-heading" data-id="378d043" data-element_type="widget">
            <div className="elementor-widget-container">
              <h2 className="elementor-heading-title elementor-size-default">Frequently Asked Question</h2>
            </div>
          </div>
          <div className="elementor-element elementor-element-43739c9 elementor-widget__width-initial elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading" data-id="43739c9" data-element_type="widget">
            <div className="elementor-widget-container">
              <p className="elementor-heading-title elementor-size-default">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
            </div>
          </div>
        </div>

        <div
          className="elementor-element elementor-element-35d9f8a elementor-widget__width-initial elementor-widget elementor-widget-n-accordion"
          data-id="35d9f8a"
          data-element_type="widget"
          data-widget_type="nested-accordion.default"
          ref={rootRef}
        >
          <div className="elementor-widget-container">
            <div className="e-n-accordion" aria-label="Accordion">
              {faqs.map((faq, index) => (
                <details
                  key={faq.id}
                  id={`e-n-accordion-item-${faq.id}`}
                  className="e-n-accordion-item"
                  open={index === 0}
                >
                  <summary
                    className="e-n-accordion-item-title"
                    data-accordion-index={index + 1}
                    aria-controls={`e-n-accordion-item-${faq.id}`}
                  >
                    <span className="e-n-accordion-item-title-header">
                      <div className="e-n-accordion-item-title-text">{faq.question}</div>
                    </span>
                    <span className="e-n-accordion-item-title-icon">
                      <span className="e-opened">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M9.29 13.71C9.3851 13.801 9.49725 13.8724 9.62 13.92C9.86346 14.02 10.1365 14.02 10.38 13.92C10.5028 13.8724 10.6149 13.801 10.71 13.71L13.71 10.71C13.8983 10.5217 14.0041 10.2663 14.0041 10C14.0041 9.7337 13.8983 9.47831 13.71 9.29C13.5217 9.1017 13.2663 8.99591 13 8.99591C12.7337 8.99591 12.4783 9.1017 12.29 9.29L11 10.59L11 7C11 6.73479 10.8946 6.48043 10.7071 6.2929C10.5196 6.10536 10.2652 6 10 6C9.73478 6 9.48043 6.10536 9.29289 6.2929C9.10536 6.48043 9 6.73479 9 7L9 10.59L7.71 9.29C7.61704 9.19628 7.50644 9.12188 7.38458 9.07111C7.26272 9.02034 7.13201 8.99421 7 8.99421C6.86799 8.99421 6.73728 9.02034 6.61542 9.07111C6.49356 9.12188 6.38296 9.19628 6.29 9.29C6.19627 9.38297 6.12188 9.49357 6.07111 9.61543C6.02034 9.73729 5.9942 9.86799 5.9942 10C5.9942 10.132 6.02034 10.2627 6.07111 10.3846C6.12188 10.5064 6.19627 10.617 6.29 10.71L9.29 13.71ZM10 20C11.9778 20 13.9112 19.4135 15.5557 18.3147C17.2002 17.2159 18.4819 15.6541 19.2388 13.8268C19.9957 11.9996 20.1937 9.98891 19.8079 8.0491C19.422 6.10929 18.4696 4.32746 17.0711 2.92894C15.6725 1.53041 13.8907 0.578004 11.9509 0.192152C10.0111 -0.193701 8.00043 0.00433284 6.17317 0.761209C4.3459 1.51809 2.78412 2.79981 1.6853 4.4443C0.58649 6.08879 0 8.02219 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7363 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20ZM10 2C11.5823 2 13.129 2.4692 14.4446 3.34825C15.7602 4.2273 16.7855 5.47673 17.391 6.93854C17.9965 8.40035 18.155 10.0089 17.8463 11.5607C17.5376 13.1126 16.7757 14.538 15.6569 15.6569C14.538 16.7757 13.1126 17.5376 11.5607 17.8463C10.0089 18.155 8.40034 17.9965 6.93853 17.391C5.47672 16.7855 4.22729 15.7602 3.34824 14.4446C2.46919 13.129 2 11.5823 2 10C2 7.87827 2.84285 5.84344 4.34315 4.34315C5.84344 2.84286 7.87827 2 10 2Z" fill="#1A1A1A"></path></svg>
                      </span>
                      <span className="e-closed">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10.71 6.28999C10.6149 6.19895 10.5028 6.12759 10.38 6.07999C10.1365 5.97998 9.86346 5.97998 9.62 6.07999C9.49725 6.12759 9.3851 6.19895 9.29 6.28999L6.29 9.28999C6.1017 9.4783 5.99591 9.73369 5.99591 9.99999C5.99591 10.2663 6.1017 10.5217 6.29 10.71C6.4783 10.8983 6.7337 11.0041 7 11.0041C7.2663 11.0041 7.5217 10.8983 7.71 10.71L9 9.40999L9 13C9 13.2652 9.10536 13.5196 9.29289 13.7071C9.48043 13.8946 9.73478 14 10 14C10.2652 14 10.5196 13.8946 10.7071 13.7071C10.8946 13.5196 11 13.2652 11 13L11 9.40999L12.29 10.71C12.383 10.8037 12.4936 10.8781 12.6154 10.9289C12.7373 10.9797 12.868 11.0058 13 11.0058C13.132 11.0058 13.2627 10.9797 13.3846 10.9289C13.5064 10.8781 13.617 10.8037 13.71 10.71C13.8037 10.617 13.8781 10.5064 13.9289 10.3846C13.9797 10.2627 14.0058 10.132 14.0058 9.99999C14.0058 9.86798 13.9797 9.73728 13.9289 9.61542C13.8781 9.49356 13.8037 9.38296 13.71 9.28999L10.71 6.28999ZM10 -4.68893e-06C8.02219 -4.86183e-06 6.08879 0.586486 4.4443 1.6853C2.79981 2.78411 1.51808 4.3459 0.761205 6.17316C0.00432882 8.00042 -0.193706 10.0111 0.192147 11.9509C0.578 13.8907 1.53041 15.6725 2.92893 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 7.34783 18.9464 4.80429 17.0711 2.92893C16.1425 2.00034 15.0401 1.26375 13.8268 0.761199C12.6136 0.258653 11.3132 -4.57412e-06 10 -4.68893e-06ZM10 18C8.41775 18 6.87103 17.5308 5.55544 16.6518C4.23985 15.7727 3.21446 14.5233 2.60896 13.0615C2.00346 11.5997 1.84504 9.99112 2.15372 8.43927C2.4624 6.88742 3.22433 5.46196 4.34315 4.34314C5.46197 3.22432 6.88743 2.46239 8.43928 2.15371C9.99113 1.84503 11.5997 2.00346 13.0615 2.60896C14.5233 3.21446 15.7727 4.23984 16.6518 5.55543C17.5308 6.87103 18 8.41774 18 10C18 12.1217 17.1571 14.1566 15.6569 15.6568C14.1566 17.1571 12.1217 18 10 18Z" fill="#1A1A1A"></path></svg>
                      </span>
                    </span>
                  </summary>
                  <div
                    role="region"
                    aria-labelledby={`e-n-accordion-item-${faq.id}`}
                    className={`elementor-element elementor-element-${faq.contentId} e-con-full e-flex e-con e-child`}
                    data-id={faq.contentId}
                    data-element_type="container"
                  >
                    <div
                      className={`elementor-element elementor-element-${faq.headingId} elementor-widget elementor-widget-heading`}
                      data-id={faq.headingId}
                      data-element_type="widget"
                    >
                      <div className="elementor-widget-container">
                        <p className="elementor-heading-title elementor-size-default">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
