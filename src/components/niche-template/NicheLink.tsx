"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { usePreviewNavigation } from "./PreviewNavigation";

type NicheLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

/** Internal site link — uses preview router in studio, Next.js Link elsewhere. */
export function NicheLink({ href, onClick, ...props }: NicheLinkProps) {
  const preview = usePreviewNavigation();

  if (preview?.enabled && href.startsWith(preview.siteBase)) {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      preview.navigate(href);
      onClick?.(e);
    };
    return <a href={href} onClick={handleClick} {...props} />;
  }

  return <Link href={href} onClick={onClick} {...props} />;
}
