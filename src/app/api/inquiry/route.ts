import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/data/site";

export const runtime = "nodejs";

/**
 * Party and catering inquiries.
 *
 * Sends from a verified Glazed Web domain so no client DNS setup is needed,
 * delivers to whatever is in INQUIRY_TO, and sets reply_to to the customer so
 * Ryan can just hit reply.
 */

const MAX = { name: 120, email: 200, phone: 40, details: 2000 };

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** Deliberately permissive. Bouncing a real customer over a regex is worse. */
function looksLikeEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function escapeHtml(v: string) {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;

  // Honeypot. Real people never fill this in because they never see it.
  if (clean(b.company, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(b.name, MAX.name);
  const email = clean(b.email, MAX.email);
  const phone = clean(b.phone, MAX.phone);
  const date = clean(b.date, 40);
  const guests = clean(b.guests, 20);
  const occasion = clean(b.occasion, 80);
  const details = clean(b.details, MAX.details);

  if (!name) return NextResponse.json({ error: "Please add your name." }, { status: 400 });
  if (!phone && !email) {
    return NextResponse.json(
      { error: "Please add a phone number or an email so we can reach you." },
      { status: 400 },
    );
  }
  if (email && !looksLikeEmail(email)) {
    return NextResponse.json({ error: "That email does not look right." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO;
  const from = process.env.INQUIRY_FROM ?? "Cascarelli's Website <inquiries@glazedweb.com>";

  if (!key || !to) {
    // Not configured yet. Say so plainly rather than pretending it sent.
    return NextResponse.json(
      {
        error: `Our form is not live yet. Please call us at ${site.phone} and we will take care of you.`,
      },
      { status: 503 },
    );
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Phone", phone || "not given"],
    ["Email", email || "not given"],
    ["Date", date || "flexible"],
    ["Guests", guests || "not given"],
    ["Occasion", occasion || "not given"],
  ];

  try {
    const resend = new Resend(key);
    const { data, error } = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()),
      replyTo: email || undefined,
      subject: `Party inquiry from ${name}${guests ? ` (${guests} guests)` : ""}`,
      text: [
        ...rows.map(([k, v]) => `${k}: ${v}`),
        "",
        "Details:",
        details || "none",
      ].join("\n"),
      html: `
        <h2 style="font-family:Georgia,serif">Party inquiry</h2>
        <table style="font-family:system-ui,sans-serif;font-size:15px;border-collapse:collapse">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="padding:4px 16px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
            )
            .join("")}
        </table>
        <p style="font-family:system-ui,sans-serif;font-size:15px;white-space:pre-wrap">${escapeHtml(details || "No extra details.")}</p>
      `,
    });

    // Success is the provider's acceptance id, not merely the absence of an
    // error. The SDK answers with a union: {data:{id}, error:null} when Resend
    // took the message, {data:null, error} when it refused. A bare 2xx that
    // carries neither, which is what an unexpected body or a change in the
    // SDK's surface looks like, is not a sent email, and answering ok:true on
    // one tells a customer Ryan has their party inquiry when nobody does.
    if (error || !data?.id) {
      console.error("Resend error:", error ?? "no acceptance id returned");
      return NextResponse.json(
        { error: `Could not send that. Please call us at ${site.phone}.` },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Inquiry send failed:", err);
    return NextResponse.json(
      { error: `Could not send that. Please call us at ${site.phone}.` },
      { status: 502 },
    );
  }
}
