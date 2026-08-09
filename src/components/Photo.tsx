import Image from "next/image";
import { photos, type PhotoKey } from "@/data/photos";

type Ratio = "wide" | "feature" | "square" | "tall";

const ratioClass: Record<Ratio, string> = {
  wide: "aspect-[3/2]",
  feature: "aspect-[4/3]",
  square: "aspect-square",
  tall: "aspect-[4/5]",
};

/**
 * Renders a photo when one exists, and a styled placeholder when it does not,
 * so the layout is identical either way and nothing looks unfinished while
 * photos are still being collected.
 *
 * `sizes` matters for performance. Pass the widest the image will ever be
 * rendered at, per breakpoint.
 */
export default function Photo({
  name,
  ratio = "feature",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className = "",
  tone = "light",
}: {
  name: PhotoKey;
  ratio?: Ratio;
  sizes?: string;
  priority?: boolean;
  className?: string;
  tone?: "light" | "dark";
}) {
  const photo = photos[name];
  const shape = `${ratioClass[ratio]} overflow-hidden rounded-2xl`;

  if (photo.src) {
    return (
      <div className={`relative ${shape} ${className}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  const dark = tone === "dark";

  return (
    <div
      className={`grain ${dark ? "grain-dark" : ""} relative isolate ${shape} border ${
        dark ? "border-cream/15 bg-ink-soft" : "border-ink/12 bg-cream-dim"
      } ${className}`}
      role="img"
      aria-label={photo.alt}
    >
      <svg
        aria-hidden
        className={`absolute inset-0 h-full w-full ${dark ? "text-cream/8" : "text-ink/8"}`}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path
          d="M0 100 L100 0 M-25 100 L75 0 M25 100 L125 0"
          stroke="currentColor"
          strokeWidth="0.4"
          fill="none"
        />
      </svg>

      <div className="relative grid h-full place-items-center p-6 text-center">
        <div>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            className={`mx-auto h-7 w-7 ${dark ? "text-gold" : "text-red"}`}
          >
            <rect
              x="2.5"
              y="4.5"
              width="19"
              height="15"
              rx="2.5"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <circle cx="8.5" cy="10" r="1.7" stroke="currentColor" strokeWidth="1.4" />
            <path
              d="M3 16.5 L9 11.5 L14 15.5 L17.5 12.5 L21 15.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p
            className={`mt-3 max-w-[22ch] text-[0.8rem] leading-relaxed ${
              dark ? "text-cream/55" : "text-ink/50"
            }`}
          >
            {photo.brief}
          </p>
        </div>
      </div>
    </div>
  );
}
