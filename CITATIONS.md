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
| Phone | **(509) 351-8404** |
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
> emergency line: (509) 351-8404.

**Consistency rules:** always "Boise Tree Pros" (never "Boise Tree Pro" / "boisetreepro"), always
the (509) number, always https + no www. Mixed NAP data is worse than fewer citations.

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
