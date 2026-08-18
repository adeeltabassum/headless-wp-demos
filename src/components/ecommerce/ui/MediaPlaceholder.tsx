type MediaPlaceholderProps = {
  className?: string;
  children?: React.ReactNode;
  /** When set, shows a real image instead of the checkerboard placeholder. */
  src?: string;
  alt?: string;
};

export function MediaPlaceholder({
  className = "",
  children,
  src,
  alt = "",
}: MediaPlaceholderProps) {
  if (src) {
    return (
      <div className={`ec-media-ph ec-media-ph--image ${className}`.trim()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="ec-media-ph__img" />
        {children}
      </div>
    );
  }

  return (
    <div className={`ec-media-ph ${className}`.trim()} aria-hidden="true">
      {children}
    </div>
  );
}
