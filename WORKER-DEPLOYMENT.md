# Keyword Research API — existing Workers static-assets site

This branch adds a Worker entry point around the existing Pages-style function without changing the current production Worker.

## What changed

- `worker.js` handles `POST /api/keyword-research` by calling the existing `functions/api/keyword-research.js` handler.
- All non-API requests are passed through to the existing static asset binding (`env.ASSETS.fetch(request)`).
- `wrangler.jsonc` configures the same Worker name and the existing repository root as the static asset directory.
- `.assetsignore` prevents Worker source/configuration and setup notes from being published as public website files.

## Before deployment

1. Confirm the GitHub branch and Cloudflare Workers Builds deployment configuration. Use this branch for a Preview/staging deployment first; do not deploy it to production until the preview is verified.
2. Confirm the current asset manifest and production asset behavior are preserved. Wrangler's asset directory must include the same public files as the current site.
3. Add these Worker secrets in Cloudflare (never commit them):
   - `GOOGLE_ADS_CUSTOMER_ID` — 10-digit Google Ads customer ID
   - `GOOGLE_OAUTH_CLIENT_ID`
   - `GOOGLE_OAUTH_CLIENT_SECRET`
   - `GOOGLE_OAUTH_REFRESH_TOKEN`
4. Add the plain-text variable `GSC_SITE_URL`, exactly matching the verified Search Console property.
5. If using a Google Ads manager account, add `GOOGLE_ADS_LOGIN_CUSTOMER_ID`.
6. Before exposing the API publicly, add Turnstile verification and/or Cloudflare rate limiting. The current browser form is same-origin but the API endpoint itself is public; Google Ads API quota and spend protections are required.
7. Deploy a Preview and test:
   - Existing homepage, service pages, images, CSS, sitemap and robots.txt
   - `GET /api/keyword-research` returns 405
   - `POST /api/keyword-research` returns a clear configuration error until Google secrets are present
   - Valid test URL returns Google Ads ideas; Search Console rows appear only for an authorized property

## Important

This branch is source preparation only. It does not deploy or modify the live Worker. The repository did not contain a Wrangler configuration or a Cloudflare Pages build workflow when inspected, so confirm the Cloudflare Workers Builds settings before enabling automatic deployment. Do not add credentials to GitHub files, commits, or chat.
