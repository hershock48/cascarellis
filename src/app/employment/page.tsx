import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Employment",
  description:
    "Job openings at Cascarelli's in Homer, Michigan. Kitchen, front of house and bar. Stop in or call (517) 568-3502.",
  alternates: { canonical: "/employment" },
};

const roles = [
  { title: "Kitchen", body: "Line, prep and pizza. Experience helps, willingness matters more." },
  { title: "Front of house", body: "Servers and hosts. Weekends are the busy shifts." },
  { title: "Bar", body: "Twenty taps to learn. We will teach you the wall." },
];

export default function EmploymentPage() {
  return (
    <>
      <PageHero
        kicker="Join us"
        title="We are usually hiring"
        intro="Cascarelli's has been a first job for a lot of people in Homer, and a long career for a few of them."
        cta={false}
      />

      <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <ul className="grid gap-6 md:grid-cols-3">
          {roles.map((r) => (
            <li key={r.title} className="rounded-panel border border-ink/10 bg-cream-dim p-7">
              <h2 className="font-display text-2xl font-semibold tracking-tight">{r.title}</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">{r.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-panel border border-ink/12 bg-cream p-8 text-center sm:p-10">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            How to apply
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[1rem] leading-relaxed text-ink/70">
            Stop in and ask for a manager, or give us a call. Afternoons between
            lunch and dinner are the easiest time to talk.
          </p>
          <a href={site.phoneHref} className="btn-primary mt-6">
            Call {site.phone}
          </a>
        </div>
      </section>
    </>
  );
}
