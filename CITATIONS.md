# Boise Tree Pros — Citations & Link Kit

Companion to `FACTS.md`. Purpose: the GSC data (Aug 2026) shows long-tail content ranking page 1
while every local head term ("boise tree service", "boise arborist", "tree removal boise") is stuck
at position 44–53 with only the homepage weakly ranking. That gap is **authority, not content** —
more on-page work will not move it. Citations and a handful of real local links are the lever.

Local file for the operator. Never deployed to the site.

---

## 1. Canonical NAP (copy-paste exactly this, everywhere)

| Field | Value |
|---|---|
| Business name | **Boise Tree Pros** |
| Phone | **(866) 228-3559** |
| Website | **https://boisetreepro.com** |
| Address | None — service-area business (SAB). Never invent one. |
| Service area | Boise, Meridian, Eagle, Garden City, Nampa, Caldwell, ID (Ada + Canyon County) |
| Hours | 24/7 (emergency line); estimates scheduled within 48 hours |
| Primary category | Tree Service |
| Secondary categories | Arborist, Tree Removal Service, Stump Grinding (as each directory allows) |
| Email | ⚠️ **NONE — see blocker below** |

**50-word description** (reuse verbatim so aggregators see one consistent story):
> Boise Tree Pros provides tree trimming, tree removal, emergency storm response, stump grinding,
> and certified arborist assessments across Boise, Meridian, Eagle, Nampa, Caldwell, and Garden
> City, Idaho. Work is held to ISA and ANSI A300 standards. Free written estimates; 24/7
> emergency line: (866) 228-3559.

**Consistency rules:** always "Boise Tree Pros" (never "Boise Tree Pro" / "boisetreepro"), always
the (866) toll-free number, always https + no www. Mixed NAP data is worse than fewer citations.

---

## 2. BLOCKER: the business has no email address

`boisetreepro.com` has **no MX record** (FACTS.md §6.1), and most directories require a working
email to register or verify. Until this is fixed, only phone-verified listings are possible.

**Fix (15 minutes, free):** add MX records via the DNS host using a forwarding service
(e.g. Cloudflare Email Routing or the registrar's free forwarding) so
`info@boisetreepro.com` forwards to a real inbox. Then record it in FACTS.md §1 and add it to the
site footer. **Do this first — it unblocks everything in §3–4.**

**Note on GBP:** a Google Business Profile is the single biggest local-rank lever, but it requires
address/video verification of a real premises or vehicle/equipment. As an unbranded lead-gen site
with no attached partner, that's not available yet. When a partner signs (see
`site-factory/PROSPECTS-BOISE.md`), a GBP under their real business details, linking to this site,
changes the head-term picture entirely. Until then, organic-only is the realistic path.

---

## 3. Citation targets — phone-or-nothing tier (possible today, no email)

| Directory | Notes |
|---|---|
| Bing Places | Phone verification available for SABs; import wizard is fast |
| Apple Business Connect | Apple ID needed (any personal one works); SAB supported |
| Foursquare | Free claim; feeds several downstream apps |
| MapQuest | Free basic listing |
| Nextdoor Business | Free page; also a real lead channel for tree work |

## 4. Citation targets — after email exists

Priority order (free tiers unless noted):

1. **Data aggregators** (feed hundreds of small directories): Data Axle (data-axle.com/expressupdate),
   Neustar Localeze (free basic), Foursquare (done above).
2. **Yelp** — free listing, phone + email verify. Do not pay for ads.
3. **Angi / HomeAdvisor** — listing only; decline their paid lead products (conflicts with our own
   lead-gen model).
4. **Alignable, Manta, Hotfrog, Brownbook, EZlocal, Cylex, n49, Storeboard, Find-Us-Here** — bulk
   tier-2; one sitting, same NAP block.
5. **BBB** — accreditation is paid; a free non-accredited profile is still a citation.

## 5. Local link targets (worth actual effort, one pitch each)

The blog has genuinely linkable Idaho-specific references — pitch the *guide*, not the company:

| Target | Asset to pitch |
|---|---|
| Boise-area HOA management companies (resource pages) | `/blog/hoa-tree-removal-rules-treasure-valley/` |
| Treasure Valley realtor blogs / buyer guides | `/blog/selling-home-tree-disclosure-idaho/`, `/blog/buying-home-mature-trees-boise/` |
| Property-manager associations (SW Idaho NARPM chapter) | `/blog/landlord-tenant-tree-responsibility-idaho/` |
| Irrigation districts' homeowner FAQs | `/blog/irrigation-canal-ditch-trees-boise/` |
| Boise foothills neighborhood associations / firewise groups | `/blog/defensible-space-boise-foothills/` |
| Local insurance agents' blogs | `/blog/tree-fell-on-house-insurance-idaho/`, `/blog/tree-insurance-claim-denied-idaho/` |

Five to ten real local links beats five hundred directory entries. The directories are the floor,
not the strategy.

---

## 6. Log

| Date | Action |
|---|---|
| 2026-08-13 | Kit created from GSC audit. Nothing submitted yet — email blocker open. |

---

## Charity donation-for-link — RESEARCHED 2026-08-29, RULED OUT ON COST

Question asked: which nonprofits will link to us from a donor/supporter page in exchange for a
donation? Every entry verified by opening the supporters page and reading the raw HTML for outbound
`<a href>` and `rel` attributes — not by reading the rendered page.

**Outcome: cheapest confirmed entry is $500. Channel parked, not pursued.**

### Passed both gates (working donate page + supporters page that actually links out)

| Charity | Supporters page | Price for a LINK | Notes |
|---|---|---|---|
| **Trees Idaho** (Boise) | treesidaho.org/membership | **$500** Contributor (org/business); then $1,000 / $1,500 / $5,000+ | Best fit by far. Links verified **dofollow**, but `alt=""` so no anchor text. |
| **Idaho Conservation League** (Boise) | idahoconservation.org/business-membership | **$500–999** = name on website; **$1,000–4,999** = logo | Only one that promises the listing **in writing**. Links dofollow, business name is the anchor text. |
| TREE Fund | treefund.org/partners | **$2,500** entry (then $5k/$10k/$25k/$50k) | Arboriculture's own research foundation. Peers are Asplundh, Bartlett, West Coast Arborists. National, not local. |
| Arbor Day Foundation | arborday.org/corporate-partnerships/partner-list | not published | Hundreds of partners, heavily diluted. Low value. |

### Why Trees Idaho is the one to revisit first

Its 2026 Industry Partners page already links **three direct competitors** — Double J Tree,
Idaho Tree Preservation, Holy Grove Tree — plus Melad Tree Farm and Jayker. Also listed: Idaho
Power, Idaho Dept. of Lands, The Nature Conservancy, and the cities of Boise, Nampa and Meridian.
Competitors are getting a link from the most topically-relevant local nonprofit in the market and
we are not. Contact: hello@treesidaho.org · 208-918-4163.

### Checked and rejected — do not re-research these

- **Treasure Valley Canopy Network (tvcanopy.net)** — was the obvious second local fit. **Site is
  dead**: returns "Squarespace — Website Expired" 404 on every URL including the root. The org may
  still operate, but there is no site to be linked from.
- **Idaho Botanical Garden** — /sponsorship page exists and sells event sponsorship, but names no
  sponsors and links none out.
- **Land Trust of the Treasure Valley** — no supporters page; sponsorship routes to a third-party
  event platform (afrogs.org).

`greatnonprofits.org` and `charitynavigator.org` both work for US orgs but surfaced **zero Idaho
tree nonprofits** — only Texas Trees, Trees Atlanta, NJ Tree Foundation, Friends of Trees (Portland).
Every Boise-local find came from plain-language searches instead.

### Blockers that apply to this channel too

1. **No email address** (see blocker section above). You cannot ask a nonprofit to list you and give
   them nowhere to reply. MX record on `boisetreepro.com` is the prerequisite.
2. ~~**(509) is a Washington area code**~~ — RESOLVED 2026-08-30. The site now uses a toll-free
   **(866) 228-3559** line everywhere, so there is no out-of-state area code to explain. A local
   208/986 number would still read better next to the City of Boise and Idaho Power on a partners
   page, but toll-free is no longer a blocker for the listings above.
