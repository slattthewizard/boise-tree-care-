# Boise Tree Pro — Canonical Facts

**This file is the single source of truth for every number, price, and claim on boisetreepro.com.**
Before writing or editing any page, blog post, draft, or schema block, check the claim against this
file. If a page disagrees with this file, the page is wrong. If reality disagrees with this file,
update this file first, then fix every page that cites it.

Why this exists: AI answer engines (ChatGPT, Perplexity, Google AI Overviews, Copilot) cross-check
the same claim across several pages of a site before quoting it. A site that answers "how much does
tree removal cost in Boise" four different ways is a bad citation and gets skipped for a competitor
who says one thing. With `public/llms.txt` now published, these numbers are being handed to answer
engines directly — so the inconsistencies below are actively costing us.

Built 2026-07-28 from a full sweep of `src/`. Local file only — never deployed.

---

## 1. Identity and contact

| Fact | Canonical value |
|---|---|
| Business name | Boise Tree Pros |
| Phone | **(866) 228-3559** — `tel:8662283559` |
| Email | ⚠️ **UNRESOLVED — see §6.1** |
| Site | https://boisetreepro.com |
| Service area | Boise, Meridian, Nampa, Caldwell, Eagle, Garden City (Ada + Canyon County, Idaho) |

**Not our number:** `(208) 388-2323` is **Idaho Power**, cited in `tree-near-power-lines-boise` and
`tree-fell-on-fence-responsibility-idaho` for downed-line emergencies. Correctly attributed — leave it.

**Towns we do NOT have pages or rankings for:** Kuna, Star, Middleton, Mountain Home, Emmett.
Do not add them to service-area lists without building the page first.

---

## 2. Pricing — canonical ranges

These resolve the contradictions catalogued in §6.2. **Every page must use these tiers and these
size cutoffs.** Ranges are ballparks, never quotes; every page must say so.

### Tree removal
| Tier | Size | Canonical range |
|---|---|---|
| Small | under 30 ft | **$300 – $800** |
| Medium | 30 – 60 ft | **$800 – $2,500** |
| Large | 60 ft+ | **$2,500 – $5,000+** |
| Extreme / crane / hazard | 80 ft+ or complex | **$5,000 – $8,000+** |
| **Headline range** | | **$300 – $5,000+** |
| Stump grinding add-on | | $150 – $500 |

### Tree trimming and pruning
| Tier | Size | Canonical range |
|---|---|---|
| Small ornamental | under 25 ft | **$150 – $400** |
| Medium | 25 – 50 ft | **$350 – $900** |
| Large | 50 ft+ | **$800 – $2,000+** |
| Specialty (crane, near power lines) | any | **$1,500+** |
| **Headline range** | | **$150 – $2,000+** |
| Fruit tree pruning | per tree, annual | $100 – $400 |

### Stump grinding
| Tier | Diameter | Canonical range |
|---|---|---|
| Small | under 12 in | **$75 – $150** |
| Medium | 12 – 24 in | **$150 – $300** |
| Large | 24 in+ | **$250 – $600+** |
| **Headline range** | per stump | **$75 – $400** |

Volume discounts for multiple stumps on one visit.

### Emergency and storm response
| Item | Canonical range |
|---|---|
| Branch/limb removal off a structure | **$150 – $850** |
| Tree on a structure | **$1,500 – $4,000+** |
| **Headline range** | **$150 – $7,000+** |

Insurance context (Idaho homeowner policies, as stated on the emergency page):
**$500 – $1,000 per tree** for removal, up to **$5,000 per storm event**.

### Other services
| Service | Canonical range |
|---|---|
| Tree health assessment | **$75 – $250** (often waived if work is scheduled) |
| Cabling and bracing | **$200 – $900** per system |
| Crown thinning | $250 – $1,500 |
| Deadwood removal | $150 – $800 |
| Lot clearing | $1,500 – $8,000+ |
| Windbreak row maintenance | $500 – $3,000+ |

### Schema `priceRange`
Currently `"$75-$5,000+"` on every area page. **This understates the site's own numbers** —
emergency reaches $7,000+ and lot clearing $8,000+. Canonical: **`"$75-$8,000+"`**.

---

## 3. Service promises

| Promise | Canonical value |
|---|---|
| Estimates | Free, on-site, no obligation |
| Emergency availability | 24/7, including nights and weekends |
| Emergency response time | ⚠️ **UNRESOLVED — see §6.3** |
| Insurance | $2M liability, insured on every job |
| Credentials | ISA-certified arborists |

**Capitalisation:** write **"ISA-certified"** (hyphenated, lowercase c) in body copy. The site
currently mixes ISA-certified / ISA Certified / ISA-Certified / ISA certified across 51 files.
Not worth a mass edit, but use the canonical form in anything new.

---

## 4. Territory facts worth keeping straight

- Boise is in **Ada County**; Nampa and Caldwell are in **Canyon County**. Meridian, Eagle and
  Garden City are Ada.
- Idaho Power handles all vegetation touching **distribution lines** — never claim we trim them.
- Boise has a **street-tree permit regime** (see `tree-removal-permits-boise` and
  `street-trees-boise-who-owns`). Do not tell readers removal is permit-free.

---

## 5. Traffic facts (for the rental pitch, not for the site)

Measured 2026-07-26 via GSC. Refresh during the fleet check; see `site-factory/PROSPECTS-BOISE.md`.

| Metric | Value |
|---|---|
| Clicks, 28d | 41 |
| Impressions, 28d | 4,185 |
| Avg position | 19.7 |
| Indexed URLs | ~15 of 73 (21%) — 28 pushed to the Indexing API 2026-07-28 |

---

## 6. Resolved 2026-07-28 (commit `9f7e4b1`)

All four issues found in the original sweep are fixed and deployed. Kept here as the record of
what was changed and why, so nothing drifts back.

### 6.1 Contact email — RESOLVED (removed)
`info@boisetreepros.com` was published on 15 files. Note the **s** — our domain is
`boisetreepro.com` (singular). `boisetreepros.com` resolves to a different host and returns 404,
so someone else owns it, and **neither domain has an MX record**, meaning the address could never
receive mail.

**Done:** removed from the header bar, the footer, and 8 JSON-LD blocks. Those slots now link to
`/#contact`. **The site has no email address.** If you want one, add an MX record to
`boisetreepro.com`, then use `info@boisetreepro.com` and record it in §1.

### 6.2 Pricing contradictions — RESOLVED (canonical tiers applied)

| Was | Now |
|---|---|
| Headline removal `$500–$5,000+` while the size table on the same page started at `$300` | `$300–$5,000+` |
| Caldwell: small `$500–$1,500`, large `$1,500–$5,000+`, FAQ disagreeing with its own table | §2 tiers |
| Size cutoffs at 25 / 30 / 50 / 60 ft for the same tiers | 30 / 60 ft for removal, 25 / 50 ft for trimming |
| Health assessment `$75–$250` vs `$75–$200` vs `$150–$400` | `$75–$250` |
| Cabling `$200–$900` vs `$300–$1,200` vs `$400–$1,200` | `$200–$900` |
| Emergency `$300–$3,000+` vs `$400–$1,200` vs `$150–$7,000+` | `$150–$7,000+` |
| Eagle stump grinding `$150–$500` | `$75–$400` |
| schema `priceRange` `$75-$5,000+` | `$75-$8,000+` |

`llms.txt` was re-synced to match.

### 6.3 Emergency response time — RESOLVED
Was stated six ways (30 min, 45 min, 2 h, 24 h, same day, 48 h). **Now "same day" throughout**,
on a 24/7 line. Do not reintroduce a drive-time promise we don't control.

### 6.4 Fabricated trust claims — RESOLVED (removed)
The site carried an invented operating history. All of it is gone:

- **Testimonials.** A 5-slide carousel of named reviews (Sarah M., Tom & Linda R., Jessica K.,
  Mark D., Rachel & Dave P.), a 6-quote scrolling marquee, and a "4.9 / Based on 120+ verified
  reviews" badge — under the heading *"Real reviews from real Boise homeowners."* Section replaced
  with **"What to Expect When You Call"** (a 4-step process block).
- **Stats.** "500+ Jobs Completed", "500+ Happy Clients", "15+ Years Experience",
  "17+ Years in Business", "4.9 ★" → cities served, free estimates, 24/7 line, ISA standards.
- **Tenure.** "Since 2008" (11 files), "Founded in 2008", schema `foundingDate`, "15+ years",
  "for over 15 years" → removed across 40 files.
- **Insurance.** The "$2M" figure → "licensed and insured". *Exception:* the "$2M minimum" in
  `/blog/tree-health-assessment-boise/` is advice to the reader about vetting a contractor and was
  deliberately left in place.
- **Superlatives.** "most trusted", "Boise's Top Tree Care Team", "hundreds of clients",
  "thousands of stumps" → softened.

**Do not reintroduce any of these.** When a partner signs, their real numbers go here, attributed
to them — which is more credible than anything we could invent, and is the honest version of the
same trust signal.

### 6.5 Still open — "ISA-certified"
The phrase appears in **51 files** and was not touched, because unlike the claims above it
describes the standard the work is held to rather than an invented statistic, and stripping it
would gut the site's positioning. It is still a claim about who does the work. Once a partner is
attached it becomes straightforwardly true and should be attributed to them by name. Your call
whether to reword it before then.

---

## 7. Change log

| Date | Change |
|---|---|
| 2026-07-28 | File created. Swept `src/` for prices, promises, credentials, contacts. Canonical tables in §2–3 set from the most-repeated defensible figures. Open questions in §6. |
| 2026-07-28 | §6.1–6.4 all fixed and deployed (`9f7e4b1`): fabricated testimonials and stats removed, tenure claims stripped, dead email removed, one set of price tiers, one response-time promise. 26 internal links added from indexed pages to 24 orphaned posts. §6.5 left open. |
