# Keyword Research Tool setup (Cloudflare Pages)

The public page is `/keyword-research/`; the API route is `/api/keyword-research`.

## What the tool returns

- Google Ads Keyword Planner URL-seed ideas: average monthly searches, competition, competition index and top-of-page bid estimates for the selected country/language.
- Google Search Console queries, clicks, impressions, CTR and average position for the exact URL, but only when that URL belongs to the Search Console property you control.
- CSV export for each result tab.

Google Ads keyword ideas are historical estimates, not live exact counts. Search Console query data belongs only to the authenticated/verified property and is normally delayed by a few days.

## Deploy as Cloudflare Pages

This repository needs to be deployed as a **Cloudflare Pages project with Functions enabled** for the `functions/api/keyword-research.js` route to run. If the existing `.workers.dev` site is a static-assets Worker rather than a Pages project, this Pages Function will not become active just by uploading the file; the API handler must be integrated into that Worker instead.

## Google credentials

1. In Google Cloud Console, enable **Google Ads API** and **Google Search Console API**.
2. Configure an OAuth consent screen and OAuth client. Generate a refresh token with these scopes:
   - `https://www.googleapis.com/auth/adwords`
   - `https://www.googleapis.com/auth/webmasters.readonly`
3. Obtain a Google Ads API developer token in the Google Ads API Center. A normal Google Ads account alone does not automatically provide an approved developer token.
4. Set the following Cloudflare Pages project variables/secrets (Settings → Variables and Secrets):
   - Secret `GOOGLE_ADS_DEVELOPER_TOKEN`
   - Secret `GOOGLE_ADS_CUSTOMER_ID` (10 digits, no hyphens)
   - Secret `GOOGLE_OAUTH_CLIENT_ID`
   - Secret `GOOGLE_OAUTH_CLIENT_SECRET`
   - Secret `GOOGLE_OAUTH_REFRESH_TOKEN`
   - Optional `GOOGLE_ADS_LOGIN_CUSTOMER_ID` if using a manager account
   - Variable `GSC_SITE_URL`, exactly matching your verified Search Console property, e.g. `https://example.com/` or `sc-domain:example.com`
5. Add the Google account that issued the refresh token as a user of the Search Console property. It must have access to the property.
6. Redeploy the Pages project after adding the Function and secrets.

## Important limitations

- Search Console cannot show organic query data for arbitrary competitor URLs. It only returns data for properties the connected Google account can access.
- The backend uses Google Ads API URL seeds for keyword ideas; it does not scrape the submitted URL itself.
- The function currently supports US, India, UK, Australia and Canada; English and Hindi.
- Add Cloudflare Turnstile/rate limiting before promoting the endpoint publicly to reduce automated abuse and API quota consumption.
