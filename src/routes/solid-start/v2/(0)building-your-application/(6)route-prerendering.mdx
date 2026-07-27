---
title: Route pre-rendering
use_cases: >-
  static site generation, ssg, blog sites, documentation, marketing pages,
  performance optimization, seo improvement
tags:
  - prerender
  - ssg
  - static
  - performance
  - build
  - seo
version: "2.0"
description: >-
  Pre-render SolidStart routes to static HTML with Nitro v3.
---

Route pre-rendering produces static HTML during `vite build`. Nitro writes the generated files to `.output/public`, where a CDN or server can serve them without rendering the route on each request.

Configure prerendering through Nitro's top-level Vite configuration.

## Pre-render selected routes

```tsx title="vite.config.ts"
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { solidStart } from "@solidjs/start/config";

export default defineConfig({
	plugins: [solidStart(), nitro()],
	nitro: {
		prerender: {
			routes: ["/", "/about"],
		},
	},
});
```

## Crawl links

Set `crawlLinks` to start at `/` and follow links found in rendered HTML. Add `routes` when the crawler needs additional entry points.

```tsx title="vite.config.ts"
export default defineConfig({
	plugins: [solidStart(), nitro()],
	nitro: {
		prerender: {
			crawlLinks: true,
			failOnError: true,
		},
	},
});
```

Dynamic routes that are not linked from a crawled page must be listed explicitly or discovered from another entry route.

For retry, concurrency, ignore, and output-path options, see [Nitro's prerender configuration](https://nitro.build/config#prerender).
