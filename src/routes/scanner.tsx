import { createFileRoute } from "@tanstack/react-router";
import { ScannerPanel } from "@/components/ScannerPanel";
import { GradientRibbon } from "@/components/GradientRibbon";

export const Route = createFileRoute("/scanner")({
  head: () => ({
    meta: [
      { title: "Scanner — BrailleVision" },
      { name: "description", content: "Scan real Braille with your camera or upload a Braille image. Voice-guided every step." },
      { property: "og:title", content: "BrailleVision Scanner" },
      { property: "og:description", content: "Live camera Braille scanner with voice guidance and image upload." },
    ],
  }),
  component: ScannerPage,
});

function ScannerPage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 pb-10 pt-12">
        <GradientRibbon />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Scanner</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Scan real Braille with your camera
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Start your camera, point at a Braille page, and let voice guidance help you capture a clean image.
            You can also upload a Braille photo from your device.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <ScannerPanel />
        </div>
      </section>
    </>
  );
}
