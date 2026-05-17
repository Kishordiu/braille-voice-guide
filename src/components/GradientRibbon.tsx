type Props = { className?: string };

/**
 * Abstract gradient blobs/ribbons used behind hero sections.
 * Pure CSS — original composition (not copied from any brand).
 */
export function GradientRibbon({ className = "" }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-gradient-brand ribbon-blur" />
      <div className="absolute top-20 right-[-120px] h-[360px] w-[520px] rotate-[18deg] rounded-[60%] bg-gradient-brand ribbon-blur opacity-50" />
      <div className="absolute bottom-[-120px] left-1/3 h-[300px] w-[600px] -rotate-12 rounded-[60%] bg-gradient-brand ribbon-blur opacity-40" />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
