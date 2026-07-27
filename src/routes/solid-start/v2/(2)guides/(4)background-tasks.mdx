---
title: Background tasks
use_cases: >-
  background tasks, scheduled jobs, periodic jobs, cron, automation
tags:
  - tasks
  - nitro
  - cron
  - scheduling
  - server
version: "2.0"
description: >-
  Define and schedule background tasks in SolidStart with Nitro v3.
---

SolidStart v2 can use Nitro v3's experimental Tasks API for on-demand and scheduled background work. Platform support depends on the deployment preset.

## Enable tasks

```tsx title="vite.config.ts"
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { solidStart } from "@solidjs/start/config";

export default defineConfig({
	plugins: [solidStart(), nitro()],
	nitro: {
		serverDir: "./server",
		experimental: {
			tasks: true,
		},
	},
});
```

## Define a task

Files under `server/tasks` are registered automatically. Nested folders become colon-separated task names, so `server/tasks/db/cleanup.ts` is named `db:cleanup`.

```ts title="server/tasks/db/cleanup.ts"
import { defineTask } from "nitro/task";

export default defineTask({
	meta: {
		name: "db:cleanup",
		description: "Remove expired sessions",
	},
	async run({ payload, context }) {
		const cleanup = deleteExpiredSessions();
		context.waitUntil?.(cleanup);
		const deleted = await cleanup;

		return {
			result: { deleted, requestedBy: payload.requestedBy },
		};
	},
});
```

## Schedule a task

Map cron expressions to task names in the Nitro configuration.

```tsx title="vite.config.ts"
export default defineConfig({
	plugins: [solidStart(), nitro()],
	nitro: {
		serverDir: "./server",
		experimental: { tasks: true },
		scheduledTasks: {
			"0 * * * *": "db:cleanup",
		},
	},
});
```

The `dev`, Node, Bun, and Deno presets run schedules with a cron engine. Cloudflare and Vercel presets integrate with their native scheduling features.

## Run a task during development

With the development server running, invoke a task through Nitro's development endpoint:

```sh frame="none"
curl http://localhost:5173/_nitro/tasks/db:cleanup
```

The endpoint can accept query parameters or a JSON body under the `payload` property. Do not expose an equivalent production endpoint without authentication and input validation.

See the [Nitro Tasks guide](https://nitro.build/docs/tasks) for programmatic execution, concurrency behavior, payloads, and platform support.
