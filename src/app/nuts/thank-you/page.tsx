import type { Metadata } from "next";
import Link from "next/link";
import ClearCartOnMount from "@/components/ClearCartOnMount";
import { site } from "@/data/site";
import { shipping } from "@/data/shop";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your Cascarelli's nut order is in.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <ClearCartOnMount />
      <section className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <span
          aria-hidden
          className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red/10 text-3xl text-red"
        >
          &#10003;
        </span>

        <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Your order is in.
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-ink/70">
          A receipt is on its way to your email. We roast before we ship, so
          give it {shipping.estimateDays.min} to {shipping.estimateDays.max}{" "}
          business days to reach you.
        </p>

        <p className="mt-4 text-[1rem] leading-relaxed text-ink/60">
          Something not right? Call us at{" "}
          <a href={site.phoneHref} className="font-semibold text-red underline">
            {site.phone}
          </a>{" "}
          and ask for a manager.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/nuts" className="btn-secondary">
            Back to the nuts
          </Link>
          <Link href="/" className="btn-primary">
            Home
          </Link>
        </div>
      </section>
    </>
  );
}
