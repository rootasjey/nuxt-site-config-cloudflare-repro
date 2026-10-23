# Cloudflare Worker startup reproduction

This minimal Nuxt app builds successfully, but the Worker fails to start under local Wrangler with the supported `@nuxtjs/sitemap@8.6.2` and `nuxt-site-config@4.2.3` pairing.

## Reproduce

Tested with Node.js 26.3.0 and npm 11.16.0.

```sh
npm ci
npm run build
npm run worker
```

The build succeeds. `npm run worker` runs Wrangler 4.152.0 in local mode; it does not deploy.

## Observed error

```text
Uncaught TypeError: Cannot read properties of undefined (reading 'env')
at null.<anonymous> (index.js:14599:32) in .output/server/chunks/nitro/nitro.mjs
The Workers runtime failed to start.
```

## Why the server helper is included

The reduced app uses Nuxt 4.6.2, NuxtHub 0.10.10, Nitro 2.13.4, and the `cloudflare-module` preset with compatibility date `2025-12-31`. Its server helper imports `db` from `hub:db` and a small SQL schema file, following the database-initialization import pattern that exposed the issue in Verbatims. The helper is called by one server route. NuxtHub and sitemap without this import pattern did not reproduce the startup failure in the tested minimal app.

The schema is a minimal fixture; no Verbatims database contents, production bindings, or secrets are included. This reproduction establishes the failure for this specific module/import combination, not for every Nuxt application.
