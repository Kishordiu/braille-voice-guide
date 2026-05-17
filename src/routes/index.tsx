import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ScanLine, Volume2, Sparkles, Camera, MessageSquareWarning, Type,
  ShieldCheck, BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientRibbon } from "@/components/GradientRibbon";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionHeading } from "@/components/SectionHeading";
import { TrustRow } from "@/components/TrustRow";
import { ArchitectureFlow } from "@/components/ArchitectureFlow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BrailleVision — Camera-powered Braille reading with voice guidance" },
      { name: "description", content: "Scan real handwritten or embossed Braille with your camera and hear the result instantly." },
      { property: "og:title", content: "BrailleVision Assistive Scanner" },
      { property: "og:description", content: "Camera-powered Braille reading with voice-guided assistance." },
    ],
  }),
  component: Home,
});

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-elevated)] sm:max-w-lg">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-[color:var(--muted)] to-[color:var(--accent)]">
        <div className="absolute inset-4 rounded-lg border-2 border-dashed border-foreground/30" />
        <div className="absolute left-6 top-6 rounded-full bg-card/90 px-2 py-1 text-[10px] font-semibold text-foreground shadow-sm">
          ● LIVE
        </div>
        {/* Braille dot grid overlay */}
        <div className="absolute inset-10 grid grid-cols-8 gap-2">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-full ${
                [1, 2, 4, 5, 9, 11, 12, 14, 17, 18, 21, 25, 28, 30, 33, 37, 39, 41].includes(i)
                  ? "bg-foreground/80"
                  : "bg-foreground/15"
              }`}
            />
          ))}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg bg-card/95 px-3 py-2 text-xs shadow-sm backdrop-blur">
          <span className="flex items-center gap-1 font-semibold text-success">
            <Volume2 className="h-3 w-3" /> Reading now
          </span>
          <span className="font-mono text-muted-foreground">conf 96%</span>
        </div>
      </div>
      <div className="mt-3 rounded-lg bg-muted p-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Result</p>
        <p className="mt-1 text-base font-semibold text-foreground">"Education is for everyone"</p>
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-20 pt-12 sm:pt-16">
        <GradientRibbon />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-semibold text-muted-foreground shadow-[var(--shadow-soft)] backdrop-blur">
              <Sparkles className="h-3 w-3 text-primary" />
              Assistive AI for real physical Braille
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Camera-powered Braille reading with{" "}
              <span className="text-gradient-brand">voice-guided assistance.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              BrailleVision helps visually impaired users scan real handwritten or embossed Braille,
              convert it into English text, and hear the result instantly.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-lg px-6">
                <Link to="/scanner">Start Reading</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-lg px-6">
                <Link to="/demo">Try Demo Mode</Link>
              </Button>
            </div>
            <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
              Voice-guided scan readiness: <span className="font-semibold text-foreground">98.7%</span>
            </p>
          </div>
          <HeroVisual />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <TrustRow />
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="The problem"
            title="Physical Braille should be easier to access."
            description="Many visually impaired users depend on Braille, but physical Braille readers are costly or unavailable. BrailleVision uses a camera-based approach to make reading support more affordable and accessible."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={Camera}
              title="Real Braille input"
              description="Works with real embossed or handwritten Braille images, not only digital Braille text."
            />
            <FeatureCard
              icon={Volume2}
              title="Voice-first guidance"
              description="Speaks instructions for lighting, blur, distance, and alignment so the user can capture a usable image."
            />
            <FeatureCard
              icon={Type}
              title="Instant text & speech"
              description="Converts detected Braille into English text and speech output in seconds."
            />
          </div>
        </div>
      </section>

      {/* Innovation teaser */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Innovation"
            title="More than Braille recognition — it guides the scan."
            description="Most converters focus only on translating Braille after input is given. BrailleVision solves a bigger problem: helping visually impaired users capture a usable image in the first place."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={MessageSquareWarning} title="Low-light voice warning" description="Detects poor lighting and tells the user to move to a brighter area." />
            <FeatureCard icon={ScanLine} title="Blur & shake detection" description="Warns the user to hold the camera steady before capture." />
            <FeatureCard icon={Camera} title="Distance guidance" description="Asks the user to move closer or farther for an ideal frame." />
            <FeatureCard icon={ShieldCheck} title="Confidence-based rescan" description="Suggests a rescan when recognition confidence is too low to trust." />
            <FeatureCard icon={Volume2} title="Voice-first mode" description="Every state change is announced — no need to look at the screen." />
            <FeatureCard icon={BookOpen} title="Real Braille pages" description="Designed for embossed and handwritten Braille, not just digital input." />
          </div>
          <div className="mt-10">
            <Button asChild variant="outline">
              <Link to="/innovation">See the full innovation breakdown</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Architecture teaser */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Architecture"
            title="A clean assistive pipeline."
            description="Each step is observable, testable, and ready to swap in a real recognition model."
          />
          <div className="mt-10">
            <ArchitectureFlow />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-4 py-20">
        <GradientRibbon />
        <div className="relative mx-auto max-w-3xl rounded-3xl border border-border bg-card/90 p-10 text-center shadow-[var(--shadow-elevated)] backdrop-blur">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to read real Braille with a camera?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Start scanning in seconds — no setup, voice-guided every step of the way.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/scanner">Start Reading</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/demo">Try Demo Mode</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
