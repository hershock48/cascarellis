import Link from "next/link";

export default function Wordmark({
  tone = "dark",
  size = "md",
}: {
  tone?: "dark" | "light";
  size?: "md" | "lg";
}) {
  const color = tone === "light" ? "text-cream" : "text-ink";
  const sub = tone === "light" ? "text-brass" : "text-brick";

  return (
    <Link href="/" className={`group block leading-none ${color}`}>
      <span
        className={`block font-display font-semibold tracking-tight ${
          size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl"
        }`}
      >
        Cascarelli&rsquo;s
      </span>
      <span
        className={`mt-1 block text-[0.6rem] font-semibold uppercase tracking-[0.28em] ${sub}`}
      >
        Homer, Mich. &middot; 1935
      </span>
    </Link>
  );
}
