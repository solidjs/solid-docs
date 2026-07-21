---
title: Request events
use_cases: >-
  server context access, local data storage, request handling, server functions,
  event access
tags:
  - events
  - server
  - context
  - locals
  - requests
  - functions
version: "2.0"
description: >-
  Access request events, typed locals, and the native H3 v2 event in SolidStart.
---

Call [`getRequestEvent`](/reference/server-utilities/get-request-event) from `solid-js/web` to access the current request in server-rendering, API, middleware, query, and action code.

```tsx
import { getRequestEvent } from "solid-js/web";

const event = getRequestEvent();
const request = event?.request;
```

`getRequestEvent()` returns `undefined` outside a request context.

## Locals

`event.locals` is request-scoped storage shared by SolidStart middleware and server code. Add your fields to the global `App.RequestEventLocals` interface:

```tsx title="src/env.d.ts"
declare namespace App {
	interface RequestEventLocals {
		user?: { id: string };
		requestId: string;
	}
}
```

The `@solidjs/start/env` type entry provides the base namespace and should be included in `tsconfig.json`.

```json title="tsconfig.json"
{
	"compilerOptions": {
		"types": ["@solidjs/start/env"]
	}
}
```

## Native event

`event.nativeEvent` is the underlying H3 v2 event. It exposes Web standard request and response objects as `event.nativeEvent.req` and `event.nativeEvent.res`.

Most application code does not need the native event. Prefer `event.request`, `event.response`, or a helper from `@solidjs/start/http`. The HTTP entrypoint is server-only, so import it only from server code or inside a function marked with `"use server"`.
