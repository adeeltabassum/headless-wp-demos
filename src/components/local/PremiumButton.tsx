import Link from "next/link";

type PremiumButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function PremiumButton({ href, children, className = "", onClick }: PremiumButtonProps) {
  const content = (
    <>
      <div className="fb-premium-btn__text-wrap">
        <span>{children}</span>
      </div>
      <div className="fb-premium-btn__icon-wrap" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 12H19M19 12L13 6M19 12L13 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );

  if (href.startsWith("#")) {
    return (
      <a href={href} className={`fb-premium-btn ${className}`} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`fb-premium-btn ${className}`} onClick={onClick}>
      {content}
    </Link>
  );
}
