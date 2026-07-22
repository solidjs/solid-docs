---
title: Sessions
use_cases: >-
  user sessions, authentication state, preferences storage, stateful
  interactions, login persistence
tags:
  - sessions
  - cookies
  - authentication
  - state
  - storage
  - persistence
version: "2.0"
description: >-
  Manage encrypted cookie sessions with the SolidStart HTTP helpers.
---

Sessions let the server associate state with multiple requests from the same browser. SolidStart exposes H3 v2's encrypted cookie-session helpers through `@solidjs/start/http`.

Session helpers are server-only. Use them from server functions, API routes, middleware, or other server-only modules.

## Create a session helper

`useSession` reads the current session and returns methods for updating or clearing it.

```ts title="src/lib/session.ts"
import { useSession } from "@solidjs/start/http";

type SessionData = {
	userId?: string;
	theme?: "light" | "dark";
};

export function useAppSession() {
	"use server";

	return useSession<SessionData>({
		name: "app-session",
		password: process.env.SESSION_SECRET as string,
		cookie: {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		},
	});
}
```

Use a secret of at least 32 characters and store it in a private environment variable. Generate one with:

```sh frame="none"
openssl rand -base64 32
```

## Read session data

```ts
export async function getCurrentUserId() {
	"use server";
	const session = await useAppSession();
	return session.data.userId ?? null;
}
```

## Update session data

```ts
export async function setTheme(theme: "light" | "dark") {
	"use server";
	const session = await useAppSession();
	await session.update({ theme });
}
```

## Clear a session

```ts
export async function logout() {
	"use server";
	const session = await useAppSession();
	await session.clear();
}
```

In addition to `useSession`, `@solidjs/start/http` exports `getSession`, `updateSession`, `clearSession`, `sealSession`, and `unsealSession` for lower-level workflows.

Cookie sessions should contain small, non-sensitive identifiers and preferences. For revocation, device management, or larger data, store the session record in a database and keep only its opaque ID in the cookie.
