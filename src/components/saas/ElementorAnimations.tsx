'use client';

import { useEffect } from 'react';

type Settings = {
  animation?: string;
  _animation?: string;
  animation_delay?: number | string;
  _animation_delay?: number | string;
};

function parseSettings(raw: string | null): Settings {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Settings;
  } catch {
    return {};
  }
}

function getAnimation(el: Element): { name: string; delay: number } | null {
  const settings = parseSettings(el.getAttribute('data-settings'));
  const name = settings.animation || settings._animation;
  if (!name || name === 'none') return null;
  const delayRaw = settings.animation_delay ?? settings._animation_delay ?? 0;
  const delay = typeof delayRaw === 'string' ? Number(delayRaw) || 0 : delayRaw || 0;
  return { name, delay };
}

export default function ElementorAnimations() {
  useEffect(() => {
    const root = document.querySelector('.elementor-4837') || document.querySelector('.saas-page');
    if (!root) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>('.elementor-invisible, [data-settings*="animation"]')
    ).filter((el) => getAnimation(el));

    if (!targets.length) return;

    const reveal = (el: HTMLElement) => {
      const anim = getAnimation(el);
      if (!anim) return;
      window.setTimeout(() => {
        el.classList.remove('elementor-invisible');
        el.classList.add('animated', anim.name);
      }, anim.delay);
    };

    if (!('IntersectionObserver' in window)) {
      targets.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          reveal(el);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
