const ELEMENTOR_CSS = [
  "/saas/css/hello-style.css",
  "/saas/css/child-style.css",
  "/saas/css/hello-reset.css",
  "/saas/css/hello-theme.css",
  "/saas/css/hello-header-footer.css",
  "/saas/css/elementor-frontend.css",
  "/saas/css/post-8.css",
  "/saas/css/widget-image.css",
  "/saas/css/widget-loop-common.css",
  "/saas/css/widget-loop-grid.css",
  "/saas/css/widget-mega-menu.css",
  "/saas/css/widget-nav-menu.css",
  "/saas/css/widget-off-canvas.css",
  "/saas/css/widget-social-icons.css",
  "/saas/css/e-apple-webkit.css",
  "/saas/css/widget-heading.css",
  "/saas/css/widget-icon-list.css",
  "/saas/css/widget-divider.css",
  "/saas/css/fadeIn.css",
  "/saas/css/fadeInUp.css",
  "/saas/css/fadeInLeft.css",
  "/saas/css/fadeInRight.css",
  "/saas/css/widget-icon-box.css",
  "/saas/css/swiper.css",
  "/saas/css/e-swiper.css",
  "/saas/css/widget-testimonial-carousel.css",
  "/saas/css/widget-carousel-module-base.css",
  "/saas/css/widget-nested-accordion.css",
  "/saas/css/post-4837.css",
  "/saas/css/post-430.css",
  "/saas/css/post-903.css",
  "/saas/css/inter.css",
] as const;

/** Loads original Elementor stylesheets from /public (bypass Next CSS bundler). */
export function SaasStyles() {
  return (
    <>
      {ELEMENTOR_CSS.map((href) => (
        <link key={href} rel="stylesheet" href={href} precedence="medium" />
      ))}
    </>
  );
}
