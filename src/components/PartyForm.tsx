"use client";

import { useState } from "react";
import { site } from "@/data/site";

const occasions = [
  "Birthday or anniversary",
  "Rehearsal dinner",
  "Graduation party",
  "Team or company dinner",
  "Club or reunion",
  "Celebration of life",
  "Something else",
];

const field =
  "w-full rounded-card border border-ink/20 bg-cream px-4 py-3 text-[0.98rem] text-ink placeholder:text-ink/40 focus:border-red focus:outline-none";
const label = "block text-sm font-semibold text-ink";

/**
 * Party and catering inquiry.
 *
 * Exists because the only way to book a group was to call, which does nothing
 * for the person planning a rehearsal dinner at 10pm. Name plus one way to
 * reach them is all that is required; everything else is optional so the form
 * never blocks someone who just wants to start a conversation.
 */
export default function PartyForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setError(`Could not send that. Please call us at ${site.phone}.`);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-panel border border-red/20 bg-red/5 p-8 text-center sm:p-10"
      >
        <span aria-hidden className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-red/10 text-2xl text-red">
          &#10003;
        </span>
        <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight">
          Got it. Thank you.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[1rem] leading-relaxed text-ink/70">
          We will get back to you within a day. If your date is close, calling
          is faster.
        </p>
        <a href={site.phoneHref} className="btn-secondary mt-6">
          Call {site.phone}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-panel border border-ink/12 bg-cream-dim p-6 sm:p-8">
      <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        Ask about a party
      </h3>
      <p className="mt-2 text-[0.98rem] leading-relaxed text-ink/65">
        Tell us roughly what you have in mind. Only your name and one way to
        reach you are required.
      </p>

      {/* Honeypot. Hidden from people, catches most bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className={label}>
            Your name <span className="text-red">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" className={`${field} mt-1.5`} />
        </div>

        <div>
          <label htmlFor="phone" className={label}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={`${field} mt-1.5`}
          />
        </div>

        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className={`${field} mt-1.5`}
          />
        </div>

        <div>
          <label htmlFor="date" className={label}>
            Date you have in mind
          </label>
          <input id="date" name="date" type="date" className={`${field} mt-1.5`} />
        </div>

        <div>
          <label htmlFor="guests" className={label}>
            About how many people
          </label>
          <input
            id="guests"
            name="guests"
            type="number"
            inputMode="numeric"
            min={1}
            max={200}
            placeholder={`${site.reservations.min} to ${site.reservations.max}`}
            className={`${field} mt-1.5`}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="occasion" className={label}>
            Occasion
          </label>
          <select id="occasion" name="occasion" defaultValue="" className={`${field} mt-1.5`}>
            <option value="">Choose one</option>
            {occasions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="details" className={label}>
            Anything else
          </label>
          <textarea
            id="details"
            name="details"
            rows={4}
            placeholder="Food you are thinking about, timing, whether you want the patio."
            className={`${field} mt-1.5 resize-y`}
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-5 rounded-card bg-red/10 px-4 py-3 text-sm text-red">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60">
          {status === "sending" ? "Sending..." : "Send inquiry"}
        </button>
        <p className="text-sm text-ink/60">
          In a hurry?{" "}
          <a href={site.phoneHref} className="font-semibold text-red underline">
            Call {site.phone}
          </a>
        </p>
      </div>
    </form>
  );
}
