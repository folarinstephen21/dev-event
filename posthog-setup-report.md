<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into your Next.js 16 App Router project. The following changes were made:

- **`instrumentation-client.ts`** (new): Initializes PostHog on the client side using the recommended Next.js 15.3+ approach. Uses a reverse proxy (`/ingest`) to avoid ad-blocker interference. Enables exception capturing for automatic error tracking and debug mode in development.
- **`next.config.ts`** (updated): Added reverse proxy rewrites to route PostHog requests through `/ingest` to the EU PostHog host, and set `skipTrailingSlashRedirect: true` as required by PostHog.
- **`components/ExploreBtn.tsx`** (updated): Added `posthog.capture("explore_events_clicked")` to the button's `onClick` handler to track top-of-funnel CTA engagement.
- **`components/EventCard.tsx`** (updated): Added `"use client"` directive and `posthog.capture("event_card_clicked", {...})` with properties `event_title`, `event_slug`, `event_location`, and `event_date` to track which events users click on.
- **`.env.local`** (new): `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables set and covered by `.gitignore`.

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the 'Explore Events' CTA button on the homepage hero section | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on an event card to view the event detail page | `components/EventCard.tsx` |

## Next steps

To monitor user behavior, create an "Analytics basics" dashboard in your PostHog project (ID: 152281) with these suggested insights:

1. **Explore Events CTA clicks over time** — Trend of `explore_events_clicked` to measure hero engagement
2. **Event card click breakdown by event** — Breakdown of `event_card_clicked` by `event_title` to see which events are most popular
3. **Event card click breakdown by location** — Breakdown of `event_card_clicked` by `event_location` to see which locations draw the most interest
4. **Conversion funnel** — Funnel from `explore_events_clicked` → `event_card_clicked` to measure CTA-to-engagement conversion
5. **Most clicked events (top 10)** — Bar chart of `event_card_clicked` grouped by `event_slug`

You can create these at: https://eu.posthog.com/project/152281/insights

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
