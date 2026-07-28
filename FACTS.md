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
| Phone | **(509) 351-8404** — `tel:5093518404` |
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

## 6. Unresolved — needs your decision

### 6.1 The contact email is on a domain we don't own
`info@boisetreepros.com` is published on **15 pages**. Note the **s** — our domain is
`boisetreepro.com` (singular). Checked 2026-07-28:

- `boisetreepros.com` resolves to a different host than our site and returns 404 — someone else has it.
- **Neither domain has an MX record**, so no email address on either one can receive mail.

So the published contact email is undeliverable at best, and at worst routes to a stranger.
**Options:** (a) drop the email everywhere and rely on the phone + form, (b) add MX to
`boisetreepro.com` and switch to `info@boisetreepro.com`, (c) use the Formspree address directly.
Until this is decided, treat every `info@boisetreepros.com` on the site as a bug.

### 6.2 Contradictions found in the sweep — pages to fix

The canonical tables in §2 already pick a winner. These are the pages that disagree with them:

| Contradiction | Where | Fix |
|---|---|---|
| Headline removal `$500–$5,000+` but size table starts at `$300` | `/tree-removal-boise/`, all 5 area pages | Headline → `$300–$5,000+` |
| Small removal `$500–$1,500`, large `$1,500–$5,000+` | `/tree-service-caldwell/` | Adopt §2 tiers |
| Caldwell FAQ says large removal `$2,500–$5,000` but its own table says `$1,500–$5,000+` | `/tree-service-caldwell/` | Adopt §2 tiers |
| Size cutoffs differ: under 25 ft / 30 ft / 50 ft / 60 ft for the same tiers | `/tree-removal-boise/` vs area pages | Standardise on 30 / 60 ft |
| Health assessment `$75–$250` vs `$75–$200` vs `$150–$400` | Meridian+Caldwell / Nampa / Eagle | → `$75–$250` |
| Cabling `$200–$900` vs `$300–$1,200` | `/blog/tree-cabling-bracing-boise/` vs Nampa+Caldwell | → `$200–$900` |
| Emergency `$300–$3,000+` vs `$150–$7,000+` vs `$400–$1,200` | area pages / emergency page / Eagle | → `$150–$7,000+` |
| Trimming `$400–$800` and `$250–$900` for mid-size | `how-often-should-trees-be-trimmed`, `crown-thinning-raising-reduction` | → `$350–$900` |

### 6.3 Emergency response time is stated six different ways
`within 30 minutes` (Eagle, Meridian) · `within 45 minutes` (Caldwell) · `within 2 hours`
(homepage) · `within 24 hours` (homepage, about) · `same-day` (7 files) · `within 48 hours` (5 files).

Pick one and propagate. Suggested: **"24/7 line, same-day response for genuine emergencies"** —
defensible without promising a drive time we don't control.

### 6.4 Trust claims that don't correspond to a real business
The site currently states:

- **"Since 2008"** (11 files) — but the homepage says **"15+ Years Experience"** and the about page
  says **"17+ Years in Business"**. 2008 → 2026 is **18 years**. Three different answers.
- **"500+ Jobs Completed"** and **"4.9 ★"** (homepage).
- **"$2M insured on every job."**

There is no operating company behind these. Flagging it because it has three practical consequences,
not to relitigate the model:

1. They can't be reconciled — there's no fact to reconcile them *to*.
2. A renter reading "since 2008, 500+ jobs, 4.9★" is being handed someone else's history, and Eden
   (18 years of *actual* ISA-certified work under Kevin Van Brunt) will notice.
3. Fabricated review scores are the specific thing Google's site-reputation spam policy targets.

**The clean fix is the partner.** Once a company signs, these become *their* real numbers, correctly
attributed — which is more credible than anything we can invent. Until then, decide whether to keep
them, soften them, or strip them. Whatever you choose, make it consistent and record it here.

---

## 7. Change log

| Date | Change |
|---|---|
| 2026-07-28 | File created. Swept `src/` for prices, promises, credentials, contacts. Canonical tables in §2–3 set from the most-repeated defensible figures. Open questions in §6. |
