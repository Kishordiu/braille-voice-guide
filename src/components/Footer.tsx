import { Link } from "@tanstack/react-router";
import { ScanLine } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-primary-foreground">
              <ScanLine className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-base font-semibold text-foreground">BrailleVision</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Camera-powered Braille reading with voice-guided assistance for visually impaired users.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Product</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/scanner" className="hover:text-foreground">Scanner</Link></li>
            <li><Link to="/demo" className="hover:text-foreground">Demo</Link></li>
            <li><Link to="/innovation" className="hover:text-foreground">Innovation</Link></li>
            <li><Link to="/architecture" className="hover:text-foreground">Architecture</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Project</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li>Built for BrailleVision Hackathon 2026</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-border pt-6 text-xs text-muted-foreground">
        <p>© 2026 K. Kishor Kumar. All rights reserved.</p>
        <p className="mt-1">Concept, design, and implementation by K. Kishor Kumar.</p>
        <p className="mt-1">Built for BrailleVision Hackathon 2026.</p>
      </div>
    </footer>
  );
}
