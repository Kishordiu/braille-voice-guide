const badges = ["Schools", "Libraries", "Colleges", "Accessibility Labs", "Public Service Centers"];

export function TrustRow() {
  return (
    <div className="mt-12">
      <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Designed for
      </p>
      <ul className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {badges.map((b) => (
          <li
            key={b}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-[var(--shadow-soft)]"
          >
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
