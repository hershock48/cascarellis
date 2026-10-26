# Jelly: the register, and the platform around it

A proposal and plan for Glazed Web's own restaurant platform. Written October 2026 from the Toast and Aloha study beside this file, the studio catalog, and the five client repos that already carry the pieces. Jelly is the name the ordering system already has in the code; whether it is the name on the box is Kevin's call.

Same contract as every glaze file: if this disagrees with the code, the code is right. Prices in here are proposals for Kevin to rule on, never quotes.

---

## 1. What we are building

A register, a kitchen, online ordering and an owner's workroom that are one system, built for one restaurant at a time and kept close. The guest orders on the restaurant's own site. The order lands on the kitchen screen and the printer. The bartender opens a tab with one tap. The owner changes a price on her phone and every screen has it within seconds. At close the register prints the day, the tax and the tips, and the numbers her accountant needs are a download, not a dealer visit.

The first restaurant is Cascarelli's of Homer, which runs Aloha today and is not attached to it. The second and third are already in the account: Copper Athletic Club and Mike's Place both carry the parked ordering demo and the workroom, and both run Toast or nothing.

### What Toast and Aloha are, and what we are

Toast and Aloha are the fast food of this business. They feed a hundred and eighty thousand restaurants the same meal, and they make their money the same way a drive-through does: volume, bundled, with the real price hidden in the processing. The study is clear on this. Toast made five billion dollars from payments in 2025 and under one billion from software. Every durable complaint about either company, the 2023 guest fee, the 2024 and 2025 rate increases, the three-year auto-renewals, the hardware that only runs their software, follows from needing fifty to a hundred basis points of card volume to pay for free terminals.

We are the other kind of kitchen. The food is made for the person at the table. The owner knows who built it and has their number. When something is wrong on a Saturday night a person answers who has stood in that bar. The software has the parts of Toast an operator actually likes, the handheld to kitchen loop, the one-tap tab, the kitchen screen, and the part of Aloha they trust, a register that keeps ringing when the internet is dead. It leaves out the parts they resent.

That is the pitch to an operator in one line: you own it, you can read the bill, you can leave, and you know who to call.

---

## 2. Why now

Three facts from the study make this the moment.

**The independents are moving.** NCR Voyix's own earnings calls say small-restaurant revenue is falling and refreshes are being deferred, and a deferred hardware refresh is the moment an independent on a proprietary system leaves. Toast added a record thirty thousand locations in 2025 and its CEO says they come from legacy on-premises systems. Half the operators surveyed bought or switched a system in the last year. The decision is being made in every town, including Homer.

**The incumbents cannot fix their own complaints.** Rate changes on thirty days' notice, early termination equal to the remaining term, support that reviewers have scored the same way for seven years: these are not bugs, they are the business model. A challenger that publishes its exit policy and its processing markup is selling something the incumbents structurally cannot.

**Reliability became the differentiator again.** On October 20, 2025 a fifteen-hour AWS outage took Toast registers down across the country while Square stayed up. Aloha's old virtue, the register that rings through anything, is a live selling point, and a cloud register that ignores it inherits Toast's weakness.

And one fact from our own repos: half of a day-one register already exists. The catalog lists nineteen versioned components across Copper and Mike's Place, DeVine carries a payment engine with a durable attempt state machine and counter-side card and cash controls, and Scooplist proved the studio can run a multi-tenant product. The missing half is the part no incumbent does well for a small pizza tavern.

---

## 3. The promise to an operator

This is the page that goes in the agreement and on the site, and it is the inverse of the incumbents' terms. Every line is a product decision, so each one has an owner below.

- **You own the hardware.** Readers, tablets, printers and the hub are bought once and are yours. Nothing is leased and nothing bricks when you leave.
- **You can leave.** Month to month after the first year, thirty days' notice, no early termination fee. Your menu, orders, customers and reports export in open formats on the day you ask.
- **You can read the bill.** One monthly line for the platform, one for processing with the markup stated as a number, one for the order fee your guests paid. No add-on stacking. No rate change without a signed amendment.
- **Your guests pay the order fee only if you choose.** A flat 99 cents on online orders, shown on its own labeled line, waived on small orders, half of it yours. You can turn it off and absorb it any day.
- **Edits are yours and they are instant.** Prices, hours, 86s and specials from your phone, live on every screen and the website in seconds. No refresh that reboots the registers, no dealer visit.
- **The register works when the internet does not.** Orders, tabs and tenders keep going on the local hub and sync when the connection returns. Cards work offline within a stated limit you set.
- **A person answers.** During your service hours a human who knows your restaurant is on the line inside five minutes. Outside them, a named person by the next morning. We are four doors away from two of the first three.
- **Your data is yours and it is safe.** Two-factor on every owner login, a verified call before any bank or payout change, and the full history of every edit in your workroom.

The study's four conditions on the fee are built into the fourth line, because our number is the number Toast tried. Toast failed on consent, on disclosure and on who got paid. Ours is chosen by the operator, itemized to the guest, and split with the house.

---

## 4. What exists, what is missing

Read from the catalog and the comparison matrix, not from memory.

### Already built and versioned

| Piece | Where | State |
|---|---|---|
| Server-side quoting in integer cents, tax in BigInt, group-qualified options | order-quote 1.0.0, option-pricing 1.0.0 | Pinned in Copper and Mike's, tested |
| Idempotent order acceptance in one Postgres statement, lost-response recovery | order-acceptance 1.0.0, order-recovery 1.0.0 | Pinned, tested |
| Kitchen board with revision-checked actions, receipts, 86, busy dial, timed pause, owner cancel | kitchen-operations 1.0.0, kitchen-request 1.0.0 | Pinned, tested |
| Star CloudPRNT printer protocol with per-device tokens, paper confirms acceptance | printer-jobs 1.0.0, printer-review 1.0.0 | Pinned, tested on protocol; no physical printer certified |
| Notification outbox with leases, retries and owner review | notification-outbox, provider, request 1.0.0 | Pinned, tested; Resend adapter only |
| Signed owner and staff sessions, per-address login limiter | workroom-session 1.0.0, Copper's login-limit | Pinned; limiter still to package |
| Owner save contract, content and event audit history, menu write with revision | owner-save, owner-request, content-cas, event-cas, menu-write 1.0.0 | Pinned |
| Workroom: menu as the one price source, events, photos, hours seam | Mike's Place (newest), Copper, Anchor | Three copies, no registry entry for the chrome |
| Payment engine with prepared, processing, unknown, completed, failed states and owner recovery | DeVine `payment-engine.ts`, `payment-attempts.ts` | Strongest copy; Square adapter only |
| Counter-side card and cash on an order card, platform fee inside the payment | DeVine `PayControls.tsx`, `payments.ts`, `oauth.ts` | Live at a paid client, Square |
| Live tap list with signed handoff and push-to-site | Scooplist, scooplist-feed asset | Product, multi-tenant |
| Postgres-or-memory store, self-creating tables, production refuses memory writes | Copper's two stores | Strongest copy; connection module still to cut |

### Missing, in the order the register needs them

1. **Touch order entry.** A screen built for a thumb at a bar: the draft grid with pint, pitcher and growler as one-tap variants, pizza by size and crust with half and quarter toppings and a configurable half-topping rule, open checks with seat numbers.
2. **Tabs and tables.** One-tap tab open with card pre-authorization, tab to table transfer, split by seat and by item, merge, hold and fire per ticket.
3. **Stripe Terminal.** The card-present rail, with the platform fee through Connect. The account has Square plumbing and no Stripe Terminal code. The study settles the choice: Square's Terminal API has no offline mode and refuses to collect the fee from the same account; Stripe's S700 and S710 do offline and carry an application fee.
4. **Cash and close.** Drawer kick through the Star printer, blind counts, paid-outs, a Z report that separates sales tax, tips, cash and card, and the day's export.
5. **Tips.** On the reader, on the receipt, declared at clock-out, pooled by rule, with the per-shift tip-credit check against Michigan's 2026 schedule and the inputs for IRS Form 8027.
6. **The Michigan engine.** Tax categories per item and per channel under the 6 percent prepared-food rules and the 75 percent utensil standard, with RAB 2026-2 read first. A to-go alcohol item class that forces the sealed-container flag, blocks original containers unless the SDM flag is set, and prompts for ID. Happy-hour guardrails as configuration.
7. **Discounts, comps and voids** behind a manager PIN with reason codes and audit rows, which the kitchen's audit contract already knows how to write.
8. **Employees.** PINs, clock in and out, roles, a labor report.
9. **The offline shell.** A progressive web app that boots from cache, mirrors the menu and open checks locally, queues writes in an outbox with idempotency keys, and a small always-on box in the restaurant that is the local hub and the print server when the ISP is down. CloudPRNT polls the cloud by design, so the hub is also what keeps paper moving.
10. **Reports and export.** Saved custom reports and raw order-line CSV on day one, because both incumbents fail there.
11. **Multi-tenant onboarding, support tooling and hardware provisioning**, which is the difference between a system for one restaurant and a product.

Delivery, loyalty, gift cards, house accounts, inventory, scheduling, kiosks and handhelds come after a second restaurant is live.

---

## 5. Decisions already made by the code, and the ones this plan makes

**The workroom is the front door and the menu is the price source.** Mike's model, ruled in the comparison matrix: one document with revision and history, the orderable board and the register both derived from it on every read. Copper's second kitchen-side price editor retires. This is also how the prices problem gets solved for Cascarelli's, which publishes none.

**Every piece ships as a versioned component.** The registry, the manifests and the copy verifier exist. The register's new pieces (order entry, tabs, cash, tax, tips, offline) enter the registry the day they are built, with Cascarelli's as the first manifest, so the second restaurant is a pin and not a port.

**Stripe for the register, Stripe for the site.** Kevin's one-rail rule says Stripe by default and Square only when Glazed places the POS. We are placing the POS, so Square was allowed, and the study rules it out on offline and on the fee. One adapter per client holds; DeVine stays Square.

**The local hub is hardware we ship.** A fanless mini PC on the restaurant's network, running the same app against a local replica, electing itself the hub when the cloud is unreachable and serving the printers. This is Aloha's redundancy and Toast's local sync, and it is the one physical thing the studio has to be willing to own, install and replace.

**Processing is honest about where it sits.** Stripe's list rate card-present is 2.7 percent plus 5 cents. Toast's paid plan is 2.49 percent plus 15 cents. On a thirty-five dollar check those are within three cents of each other, and on eighty thousand dollars a month of card volume our total with a 0.25 percent platform fee lands within about seventy dollars of Toast's. We do not win on the rate at launch, and the agreement should not claim we do. We win on no term, no add-ons, no unilateral changes, and a markup printed on the bill. Interchange-plus with Stripe is a negotiation at volume and belongs on the two-year roadmap, not the launch page.

**The fee is the one the study validated.** Flat 99 cents, customer-paid, operator-enabled, itemized, waived under a floor, half to the house, in the agreement. Owner.com charges guests five percent and survives; BentoBox charges restaurants 99 cents an order and survives. Ours is 2.5 percent of a forty-dollar pizza order and below every first-party product in the study.

---

## 6. The plan, in phases with gates

The gate rule is DeVine's: each phase has to be used daily by a real restaurant before the next one is funded. Lanes are AGENTS.md's: Codex owns workroom, kitchen, printer and payment code; Claude owns the pitch, the agreement copy, the operator-facing words and the review; Kevin owns prices, agreements, hardware purchases and anything a client sees before it is sent. Durations are the study's estimates for a team of one plus two agents, and they are estimates.

### Phase 0. Cascarelli's online, on the bones we have. Six to eight weeks.

What ships: the workroom with the menu as the price source, hours, 86 and pause, events, the Scooplist taps handoff; online ordering ported from Mike's with the pizza matrix, capacity per fifteen-minute slot, order-ahead and the 21-plus flag; the kitchen board and the printer; the order fee wired through Stripe Connect; the party form landing in the workroom as a lead instead of only an inbox.

Gate to pass: Ryan has entered real prices, a real online order has been printed at the pass and picked up, and the restaurant has run it for a month while Aloha still rings the room.

Blocked on: prices, which do not exist anywhere public; the pizza pricing rule; capacity per slot; whether beer and wine to go is sold online; the fee model agreed in writing.

### Phase 1. The counter. Three to four months.

What ships: touch order entry for phone and walk-in to-go, the draft grid, Stripe Terminal with tips, cash and the drawer, the Z report, the Michigan tax and alcohol engine, employee PINs, discounts and voids with reasons, saved reports and CSV export. The to-go lane moves off Aloha entirely. The register runs on a tablet at the counter and the hub sits on the shelf.

Gate to pass: every to-go order for a month, cash and card, rung on ours, with the accountant signing off on the tax report and the tip report against a month of Aloha's.

### Phase 2. The floor. Three to four months.

What ships: tabs with pre-authorization, tables and seats, splits and transfers, hold and fire, coursing where the kitchen wants it, clock-in and the labor report, the full offline shell with the hub electing itself and cards within a stated offline limit, and a second terminal behind the bar. Aloha is unplugged.

Gate to pass: a Friday and a Saturday night with the internet deliberately pulled, every tab closed, every tip reconciled, and the Z report matching the drawer.

### Phase 3. The second restaurant. Three to six months.

What ships: multi-tenant onboarding on Scooplist's org model, per-licensee tax and alcohol configuration, support tooling that shows a technician a restaurant's screens without a visit, hardware provisioning and the spare-parts shelf, the one-page policy on the site, and the pricing page. Copper or Mike's goes live as the second, on a pin of Cascarelli's manifest.

Gate to pass: the second restaurant onboarded without a line of code written for it. That is the Scooplist test and it is what makes this a product.

Phases 1 through 3 are Codex's lane to build and Claude's to review, each component entering the registry in the commit that builds it. The second opinion runs on every design decision that touches money.

---

## 7. The business

Numbers here are proposals. Kevin sets prices in the registry and nowhere else.

**For the operator.** A platform fee of $99 a month per location and $29 a month per terminal, month to month after year one. Processing at Stripe's rate plus a stated 0.25 percent platform fee. The 99 cent order fee, half to the house. Hardware at cost plus installation. The website at the menu price it already carries, since the site and the register are one system.

**For the studio.** On a restaurant doing eighty thousand dollars a month in card volume and five hundred online orders, that is roughly $160 a month in platform fees, $200 in processing margin and $250 in order fees, about $600 a month per restaurant before the website's monthly. Ten restaurants is a business. Toast's own yardstick, from the study, is about five thousand dollars a year of gross profit per million dollars of card volume; ours lands near a third of that per restaurant, by design, because the gap is what the operator keeps and it is the reason to switch.

**The cost we carry.** One hub per restaurant at a few hundred dollars, readers at $299, the hours of install and training, and the standing promise of a person inside five minutes. That promise is the real price of the model and it is why the customer count grows by referral and not by territory reps. Toast closes forty-five percent of deals with a visit; one in five comes from a referral. We get only the second channel, and a visible restaurant in Homer running it well is the referral.

---

## 8. Service, which is the product

The study found one complaint unchanged across seven years of reviews on both platforms: post-sale support. Everything else they can patch. This they cannot, because a hundred and eighty thousand locations and a support floor are the same decision.

Ours is structured so the promise can be kept by a small studio.

- **A named person**, before, during and after launch, with a phone number the owner already has.
- **Onboarding as a general contractor**, Toast's one good idea: a checklist, the menu imported from whatever they have, training on the floor, go-live with us in the room.
- **Service hours coverage** with remote diagnostics, so the first answer on a Saturday is a look at the screens and not a question.
- **A quarterly visit.** Twenty minutes at the bar to ask what is slow. The improvement pass at Mike's and the third pass at Cascarelli's both came from Kevin saying what looked wrong; the operators will too, if someone is there to hear it.
- **No ticket queue the owner can see.** They text or call. The queue is ours to run.

The limit is honest: this scales to the number of restaurants one studio can know by name, which is dozens, and that is the business. When it is hundreds, the model changes and so does the price, and that is a decision for then.

---

## 9. What could go wrong, said plainly

- **Offline is the hardest engineering in the plan** and no source gave a benchmark for it. The hub design is the mitigation and the Phase 2 gate, the pulled-cable weekend, is the proof.
- **Stripe Terminal is unbuilt.** The engine and the attempt repository port from DeVine; the adapter is new; the offline card limits on the S700 were not found in the study and have to be read from Stripe's docs.
- **One developer.** The phases are sequential for that reason. Nothing in Phase 2 starts while Phase 1 is being run in anger.
- **Michigan rules are partly unverified from the sandbox.** RAB 2026-2 on prepared food, the alcohol-to-go statute after its December 2025 sunset, and the happy-hour rule text all need a read from a machine that can open michigan.gov, and the accountant and the MLCC before launch.
- **The processing rate does not beat Toast's paid plan at launch.** The agreement must not say it does. The savings are on the other lines and on the exit.
- **The productizing gate can fail.** If Cascarelli's does not run Phase 1 daily, Phase 2 waits. That was the rule at DeVine and it was right.
- **Aloha stays plugged in until Phase 2 passes.** A restaurant that cannot take money is the one failure the plan cannot have.

---

## 10. Decisions for Kevin, in the order they block

1. The name. Jelly is in the code; it may or may not be on the box.
2. The promise page in section 3, line by line, since it goes into the agreement.
3. Prices in section 7, into the registry.
4. The rail: Stripe Terminal for the register, which this plan assumes.
5. The hub: that the studio will ship and own a piece of hardware.
6. Cascarelli's as the first, and whether Copper or Mike's is the second.
7. The fee split and the floor below which the order fee is waived.
8. Who reads RAB 2026-2 and the alcohol statute, and when the accountant meeting happens.

---

## 11. The first thirty days

1. Sit with Ryan. Prices, the pizza pricing rule, capacity, beer and wine to go, who runs the register and who closes, what Aloha does that he would miss. Write the answers into the client file the same day.
2. Read the Michigan rules from Kevin's machine and put the findings in the client file with their sources.
3. Port the workroom and the ordering system from Mike's into Cascarelli's as pins, with the pizza matrix as the first new component in the registry.
4. Open the Stripe Connect account structure for the fee and walk one test order through it.
5. Order one S700, one Star printer with a drawer, and one mini PC, and put them on the counter in Homer running the demo.
6. Write the promise page and the agreement amendment for Kevin's read.
7. Log every send, reply and meeting in the ledger as it happens.

The study closed with the sentence this plan is built on. The half of a register the studio already owns is the half everyone has. The half it does not, tabs that open with a tap, cash that balances, Michigan's tax and tips done right, and a register that keeps ringing when the cable is out, is the half no incumbent does well for a small pizza tavern. That is the opening, and it is a product.
