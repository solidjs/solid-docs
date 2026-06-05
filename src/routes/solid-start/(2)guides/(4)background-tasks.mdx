---
title: Background tasks
use_cases: >-
  background tasks, scheduled jobs, periodic jobs, cron, automation
tags:
  - cron
  - nitro
  - tasks
  - solidstart
version: "1.0"
description: >-
  Schedule background tasks in SolidStart using Nitro's Tasks API for periodic
  jobs and automated server-side operations.
---

SolidStart supports scheduled background tasks through [Nitro's Tasks API](https://nitro.build/guide/tasks).
Background tasks are server-side operations that run independently of the user request-response cycle.
They are typically used for time-consuming or periodic work like data processing or maintenance jobs.
These tasks execute on the server and can be triggered on a schedule or programmatically.

For details on which hosting platforms support scheduled tasks (including platform-specific native integrations like Cloudflare Cron Triggers and Vercel Cron Jobs), see the [Nitro documentation on platform support](https://nitro.build/docs/tasks#platform-support).

## Configuration

Tasks are an experimental feature and must be explicitly enabled:

```ts title="app.config.ts"
import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
	server: {
		experimental: {
			tasks: true,
		},
	},
});
```

## Creating a task

To create a task:

1. Create a task file in the `tasks/` directory at your project root (not inside `src/`).
2. Use the `defineTask` function to define a task and `export default` the result.

```ts title="tasks/cleanup-sessions.ts"
import { defineTask } from "nitropack/runtime";

export default defineTask({
	meta: {
		name: "cleanup-sessions",
		description: "Remove stale database sessions",
	},
	async run() {
		// Delete expired sessions older than 7 days
		const deletedSessions = await db.session.deleteMany({
			where: {
				lastActive: {
					lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
				},
			},
		});
		console.log(`Cleanup complete: ${deletedSessions.count} sessions deleted`);
		return { result: { deletedSessions } };
	},
});
```

:::note
`nitropack` is a transitive dependency of SolidStart.
If TypeScript can't resolve the import, add it as a dev dependency:

```package-install-dev
nitropack
```

:::

Refer to the [Nitro documentation](https://nitro.build/docs/tasks#task-interface) to learn more about `defineTask`.

## Scheduling tasks

To run a task automatically on a schedule, add a `scheduledTasks` object to your `app.config.ts`.
The key is a cron expression, and the value is the task name or an array of task names.
When multiple tasks are assigned to the same cron expression, they run in parallel.

```ts title="app.config.ts"
import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
	server: {
		experimental: {
			tasks: true,
		},
		scheduledTasks: {
			// Run at midnight every day
			"0 0 * * *": "cleanup-sessions",
		},
	},
});
```

:::tip
You can use [crontab.guru](https://crontab.guru/) to help generate and understand cron patterns.
:::

## Running tasks on demand

You can trigger a task manually via the Nitro task endpoint during development using a `GET` request:

```sh
curl http://localhost:3000/_nitro/tasks/cleanup-sessions
```

This is useful for testing your task logic without waiting for the scheduled time.
