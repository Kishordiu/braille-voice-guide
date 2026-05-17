import { createFileRoute } from "@tanstack/react-router";
import { GradientRibbon } from "@/components/GradientRibbon";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — BrailleVision" },
      { name: "description", content: "BrailleVision is a camera-based assistive reader for real physical Braille." },
      { property: "og:title", content: "About BrailleVision" },
      { property: "og:description", content: "Designed to help visually impaired users read real Braille with a simple camera." },
    ],
  }),
  component: About,
});

const useCases = ["Schools", "Libraries", "Colleges", "Public service centers", "Homes", "Accessibility labs"];

function About() {
  return (
    <>
      <section className="relative overflow-hidden px-4 pb-10 pt-12">
        <GradientRibbon />
        <div className="relative mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="About"
            title="Reading real Braille with a simple camera."
            description="BrailleVision Assistive Scanner is designed to help visually impaired users read real physical Braille using a simple camera. It uses computer vision concepts to detect Braille dot patterns, converts them to English text, and provides speech output."
          />
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <h2 className="text-lg font-semibold text-foreground">Use cases</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {useCases.map((u) => (
                <li
                  key={u}
                  className="rounded-lg border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground"
                >
                  {u}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <h2 className="text-lg font-semibold text-foreground">Author</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Created by <span className="font-semibold text-foreground">K. Kishor Kumar</span>.
              Concept, design, and implementation by K. Kishor Kumar.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              © 2026 K. Kishor Kumar. All rights reserved. Built for BrailleVision Hackathon 2026.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
