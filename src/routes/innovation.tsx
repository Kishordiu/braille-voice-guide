import { createFileRoute } from "@tanstack/react-router";
import { MessageSquareWarning, ScanLine, Camera, Crosshair, ShieldCheck, Volume2 } from "lucide-react";
import { GradientRibbon } from "@/components/GradientRibbon";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard } from "@/components/FeatureCard";

export const Route = createFileRoute("/innovation")({
  head: () => ({
    meta: [
      { title: "Innovation — BrailleVision" },
      { name: "description", content: "Voice-first scan guidance that helps visually impaired users capture a usable Braille image." },
      { property: "og:title", content: "BrailleVision Innovation" },
      { property: "og:description", content: "More than recognition — BrailleVision guides the scan itself." },
    ],
  }),
  component: Innovation,
});

function Innovation() {
  return (
    <>
      <section className="relative overflow-hidden px-4 pb-10 pt-12">
        <GradientRibbon />
        <div className="relative mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Innovation"
            title="More than Braille recognition — it guides the scan."
            description="Most converters focus only on translating Braille after input is given. BrailleVision solves a bigger problem: helping visually impaired users capture a usable image in the first place."
          />
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard icon={MessageSquareWarning} title="Low-light voice warning"
            description="Detects poor lighting and tells the user: 'Lighting is low. Please move to a brighter place.'" />
          <FeatureCard icon={ScanLine} title="Blur and shake detection"
            description="Identifies motion blur and asks the user to 'Hold the camera steady' before capture." />
          <FeatureCard icon={Camera} title="Camera distance guidance"
            description="Voice cues like 'Move closer' or 'Move slightly away' help frame the page correctly." />
          <FeatureCard icon={Crosshair} title="Page alignment guidance"
            description="Tells the user to 'Move slightly left' or 'Center the Braille page' so dots are readable." />
          <FeatureCard icon={ShieldCheck} title="Confidence-based rescan"
            description="If recognition confidence is low, BrailleVision asks for a rescan instead of guessing." />
          <FeatureCard icon={Volume2} title="Voice-first accessibility"
            description="Every status change is announced. The user never has to look at the screen to use the app." />
        </div>
      </section>
    </>
  );
}
