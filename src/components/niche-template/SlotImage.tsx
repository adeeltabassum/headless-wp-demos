import Image, { type ImageProps } from "next/image";

/**
 * Renders an image slot. Hand-authored placeholder SVGs (shipped in
 * /public/niche-template/images) are served as plain <img> — there is
 * nothing for the optimizer to resize/compress on a vector graphic, and
 * skipping it avoids routing through the Next.js image endpoint entirely.
 * Real photos (once a site swaps in .jpg/.png/.webp content) automatically
 * get full next/image optimization, lazy loading, and CLS prevention.
 */
export function SlotImage({ src, alt, width, height, className, ...rest }: ImageProps) {
  const srcStr = typeof src === "string" ? src : undefined;
  if (
    srcStr &&
    (srcStr.endsWith(".svg") ||
      srcStr.startsWith("data:") ||
      srcStr.startsWith("https://picsum.photos/") ||
      srcStr.startsWith("https://fastly.picsum.photos/") ||
      srcStr.startsWith("https://images.pexels.com/"))
  ) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={srcStr} alt={alt} width={width} height={height} className={className} />;
  }

  return <Image src={src} alt={alt} width={width} height={height} className={className} {...rest} />;
}
