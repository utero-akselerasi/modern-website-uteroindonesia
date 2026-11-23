# Measurement and Success Metrics

## KPI Tree

| Level | KPI | Definition |
|---|---|---|
| Commercial | Won projects, realized gross profit, CAC | CRM outcomes joined to campaign cost |
| Pipeline | Sales-accepted opportunities, qualified pipeline | Accepted opportunities and estimated values |
| Acquisition | Qualified leads, CPQL | Spend divided by unique qualified leads |
| Lead capture | Verified leads, CPL | Valid inquiries actually received |
| Intent | Contact-intent sessions, intent rate | Sessions with campaign CTA click |
| Diagnostic | CTA view/click, portfolio engagement, search terms | Optimization signals only |

Do not count WhatsApp clicks as leads.

## Launch Targets

No historical baseline exists in repo. Use gates, not invented benchmarks.

- First 10 inquiries: at least 3 must meet qualification criteria before spend increases.
- Four-week baseline starts only after tracking and CRM capture pass QA.
- Initial CRO hypothesis: improve landing-to-verified-lead rate by 10% relative to baseline.
- Event data completeness release gate: at least 95% of applicable required fields.
- Eligible offline import acceptance operating target: at least 99% after retries.
- Financial ceiling: `allowable CPQL = allowable CAC x mature qualified-lead-to-win rate`.
- Allowable CAC must derive from realized gross profit and approved acquisition share.

## Qualification Model

| Criterion | Max |
|---|---:|
| Supported service fit | 30 |
| Concrete business need | 25 |
| Budget feasibility | 20 |
| Timing | 15 |
| Decision access | 10 |

Qualified: score >=65, valid contact, supported need, two-way exchange, no disqualifier. Unknown budget remains unknown, not automatically unqualified.

## Event Contract

Implemented now:

- `campaign_cta_click`: campaign slug and CTA placement.

Required next:

- `cta_view`, `contact_click`, `generate_lead`, `qualify_lead`, `consultation_booked`, `working_lead`, `close_convert_lead`, `close_unconvert_lead`.

Never send names, emails, phone numbers, or message text to analytics.

## UTM Convention

`utm_campaign={market}_{service}_{objective}_{period}`

Example:

`?utm_source=instagram&utm_medium=paid_social&utm_campaign=eastjava_integratedcreative_leads_2026q4&utm_id=impact_01&utm_content=fragmented_vendors_carousel_a`

Use lowercase controlled slugs. Preserve `gclid`, `gbraid`, `wbraid`, and `msclkid` where consent and platform rules allow. Never use UTMs on internal links.

## Dashboard Fields

- Media: platform, campaign/ad IDs, spend, impressions, clicks, conversion action.
- Site: landing page, source/medium, UTMs, CTA placement, event, consent state.
- CRM: lead ID, owner, service, city, stage timestamps, qualification score, loss reason.
- Outcome: opportunity ID, proposed value, won/lost date, actual deal value, gross profit.
- Health: missing fields, attribution match rate, duplicates, import failures, ingestion lag.

## Weekly Loop

1. Check tracking and destination health daily.
2. Reconcile media and CRM every Monday.
3. Review representative qualified, lost, and unmatched leads.
4. Decide experiment: scale, stop, continue, or inconclusive.
5. Reallocate by CPQL, mature win economics, and team capacity.
6. Run Friday mobile, CTA, UTM, and offline-import QA.