import { createFileRoute } from "@tanstack/react-router";
import { GradientRibbon } from "@/components/GradientRibbon";
import { SectionHeading } from "@/components/SectionHeading";
import { ArchitectureFlow } from "@/components/ArchitectureFlow";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "Architecture — BrailleVision" },
      { name: "description", content: "How BrailleVision goes from camera frame to spoken English text." },
      { property: "og:title", content: "BrailleVision Architecture" },
      { property: "og:description", content: "A clean, observable assistive pipeline from image to speech." },
    ],
  }),
  component: Architecture,
});

function Architecture() {
  return (
    <>
      <section className="relative overflow-hidden px-4 pb-10 pt-12">
        <GradientRibbon />
        <div className="relative mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Architecture"
            title="From camera frame to spoken English."
            description="Every stage is independent, testable, and ready to swap in a real backend recognition model."
          />
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-12">
          <ArchitectureFlow />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <h3 className="text-lg font-semibold text-foreground">How it works</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The frontend captures image frames from the device camera or an uploaded photo and sends them
                to an analysis service. The image is checked for lighting, blur, alignment, and dot visibility.
                Braille dots are then grouped into cells, mapped into English characters, and returned with a
                confidence score. The result is rendered on screen and spoken through the browser's speech
                synthesis engine.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <h3 className="text-lg font-semibold text-foreground">API-ready service layer</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                All recognition calls flow through <code className="rounded bg-muted px-1.5 py-0.5 text-xs">src/services/brailleApi.ts</code>
                {" "}with typed functions <code className="rounded bg-muted px-1.5 py-0.5 text-xs">analyzeFrame</code>,
                {" "}<code className="rounded bg-muted px-1.5 py-0.5 text-xs">analyzeUploadedImage</code>,
                {" "}<code className="rounded bg-muted px-1.5 py-0.5 text-xs">translateBrailleDots</code>, and
                {" "}<code className="rounded bg-muted px-1.5 py-0.5 text-xs">checkImageQuality</code>. They currently
                return simulated results and can be swapped for FastAPI endpoints with no UI changes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
