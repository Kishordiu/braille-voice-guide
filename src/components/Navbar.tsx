import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/scanner", label: "Scanner" },
  { to: "/demo", label: "Demo" },
  { to: "/innovation", label: "Innovation" },
  { to: "/architecture", label: "Architecture" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-[var(--shadow-card)] backdrop-blur md:px-6"
      >
        <Link to="/" className="flex items-center gap-2" aria-label="BrailleVision home">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-primary-foreground">
            <ScanLine className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-base font-semibold tracking-tight text-foreground">
            BrailleVision
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeProps={{ className: "text-foreground bg-muted" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild size="sm" className="rounded-lg">
            <Link to="/scanner">Start Reading</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)] md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button asChild className="w-full">
                <Link to="/scanner" onClick={() => setOpen(false)}>
                  Start Reading
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
