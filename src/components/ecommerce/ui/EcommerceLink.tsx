"use client";

import NextLink from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { usePreviewNavigation } from "@/components/niche-template/PreviewNavigation";

type EcommerceLinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  href: string;
};

/**
 * Internal store link — uses Studio in-panel router when preview is active,
 * otherwise normal Next.js navigation (published sites).
 */
export function EcommerceLink({ href, onClick, ...props }: EcommerceLinkProps) {
  const preview = usePreviewNavigation();

  if (preview?.enabled) {
    const isSiteLink =
      href === preview.siteBase || href.startsWith(`${preview.siteBase}/`);

    if (isSiteLink) {
      const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        preview.navigate(href);
        onClick?.(e);
      };
      return <a href={href} onClick={handleClick} {...props} />;
    }
  }

  return <NextLink href={href} onClick={onClick} {...props} />;
}
