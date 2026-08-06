---
title: Deployment plugins
use_cases: >-
  deployment, hosting, server runtime, adapters, nitro, netlify, cloudflare,
  edge functions, workers
tags:
  - deployment
  - hosting
  - vite
  - nitro
  - netlify
  - cloudflare
  - server
version: "2.0"
description: >-
  Choose and configure a deployment Vite plugin for a SolidStart v2 app.
---

SolidStart v2 uses Vite's Environment API for its client and server builds. The `solidStart()` plugin configures the application, while a deployment Vite plugin integrates the server build with a production runtime and hosting target.

Choose one deployment plugin. Nitro provides portable deployment presets, while the Netlify and Cloudflare plugins integrate directly with their respective platforms.

## Nitro

[Nitro v3](https://nitro.build/) supports multiple deployment targets through presets.

```package-install
nitro
```

Add `nitro()` after `solidStart()`:

```tsx title="vite.config.ts"
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { solidStart } from "@solidjs/start/config";

export default defineConfig({
	plugins: [solidStart(), nitro()],
});
```

Use the top-level `nitro` property for deployment presets, prerendering, tasks, WebSockets, and other Nitro options. See the [Nitro configuration reference](https://nitro.build/config).

## Netlify

The [Netlify Vite plugin](https://docs.netlify.com/build/frameworks/framework-setup-guides/solidstart/) prepares the server build for Netlify Functions and emulates Netlify platform features during development.

```package-install-dev
@netlify/vite-plugin
```

Add the plugin after `solidStart()` and enable its build support:

```tsx title="vite.config.ts"
import netlify from "@netlify/vite-plugin";
import { defineConfig } from "vite";
import { solidStart } from "@solidjs/start/config";

export default defineConfig({
	plugins: [solidStart(), netlify({ build: { enabled: true } })],
});
```

No SolidStart-specific adapter is required. Netlify detects SolidStart and can supply the build command and publish directory automatically. Its [SolidStart v2 announcement](https://www.netlify.com/changelog/2026-08-06-solidstart-2-on-netlify/) explains how the integration uses Vite's Environment API.

## Cloudflare

The [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) runs the server build in the Workers runtime during development and prepares it for deployment to Cloudflare.

```package-install-dev
@cloudflare/vite-plugin wrangler
```

Map the Worker to SolidStart's `ssr` environment:

```tsx title="vite.config.ts"
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import { solidStart } from "@solidjs/start/config";

export default defineConfig({
	plugins: [cloudflare({ viteEnvironment: { name: "ssr" } }), solidStart()],
});
```

The `viteEnvironment` option merges the Workers runtime configuration with SolidStart's server environment. Follow the Cloudflare guide to add a Wrangler configuration and any platform bindings.
