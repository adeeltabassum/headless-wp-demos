export function NicheTemplatePagination({
  previousHref,
  nextHref,
}: {
  previousHref?: string;
  nextHref?: string;
}) {
  if (!previousHref && !nextHref) return null;

  return (
    <div className="nt-pagination">
      <a href={previousHref ?? "#"} aria-disabled={!previousHref}>
        {previousHref ? "« Previous" : ""}
      </a>
      <a href={nextHref ?? "#"} aria-disabled={!nextHref}>
        {nextHref ? "Next »" : ""}
      </a>
    </div>
  );
}
