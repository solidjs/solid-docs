---
title: Security
use_cases: >-
  production apps, user input handling, authentication, public apis, preventing
  attacks, secure deployments, compliance
tags:
  - security
  - xss
  - csrf
  - cors
  - csp
  - middleware
  - protection
version: "2.0"
description: >-
  Secure your SolidStart apps against XSS, CSRF attacks. Configure CSP headers,
  CORS policies, and implement security best practices.
---

## XSS (Cross Site Scripting)

Solid automatically escapes values passed to JSX expressions to reduce the risk of XSS attacks.
However, this protection does not apply when using [`innerHTML`](/reference/jsx-attributes/innerhtml).

To protect your application from XSS attacks:

- Set a [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).
- Validate and sanitize user inputs, especially form inputs on the server and client.
- Avoid using `innerHTML` when possible.
  If necessary, make sure to sanitize user-supplied data with libraries such as [DOMPurify](https://github.com/cure53/DOMPurify).
- Sanitize attributes containing user-supplied data within `<noscript>` elements.
  This includes both the attributes of the `<noscript>` element itself and its children.
- When URLs are provided or constructed via user input validate its `origin` and `protocol` (to avoid evaluating code via `javascript:` URLs) using the [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) API.

It is highly recommended to read the [Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) for further guidance.

## Content Security Policy (CSP)

To configure the `Content-Security-Policy` HTTP header, a [middleware](/solid-start/v2/advanced/middleware) can be used.

SolidStart v2 defaults to JSON serialization, which avoids an `unsafe-eval` requirement. Keep that default for a strict CSP. See [`solidStart` serialization](/solid-start/v2/reference/config/solid-start#serialization).

### With nonce (recommended)

If you want to use a [strict CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP#strict_csp) with nonces:

1. Create middleware that generates a nonce and configures the CSP header before calling `next()`.
2. Create a nonce using a cryptographic random value generator, such as the [`randomBytes`](https://nodejs.org/api/crypto.html#cryptorandombytessize-callback) function from the `crypto` module.
3. Store the nonce in the [`locals`](/solid-start/v2/advanced/middleware#locals) object.
4. Configure SolidStart to use the nonce in your [`entry-server.tsx`](/solid-start/v2/reference/entrypoints/entry-server) file.

```tsx tab title="Middleware"
import { createMiddleware } from "@solidjs/start/middleware";
import { randomBytes } from "node:crypto";
import { getRequestEvent } from "solid-js/web";

export default createMiddleware([
	(event, next) => {
		const nonce = randomBytes(16).toString("base64");
		const requestEvent = getRequestEvent();
		if (requestEvent) requestEvent.locals.nonce = nonce;

		const csp = `
      default-src 'self';
      script-src 'nonce-${nonce}' 'strict-dynamic';
      object-src 'none';
      base-uri 'none';
      frame-ancestors 'none';
      form-action 'self';
    `.replace(/\s+/g, " ");

		event.res.headers.set("Content-Security-Policy", csp);
		return next();
	},
]);
```

```tsx tab title="entry-server.tsx" {7}
// src/entry-server.tsx
// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(
	() => <StartServer /* ... */ />,
	(event) => ({ nonce: event.locals.nonce })
);
```

### Without nonce

To configure CSP without a nonce, set the header after the downstream handler returns:

```tsx
import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware([
	async (event, next) => {
		const response = await next();
		const csp = `
      default-src 'self';
      font-src 'self'  ;
      object-src 'none';
      base-uri 'none';
      frame-ancestors 'none';
      form-action 'self';
    `.replace(/\s+/g, " ");

		event.res.headers.set("Content-Security-Policy", csp);
		return response;
	},
]);
```

## CORS (Cross-Origin Resource Sharing)

When other applications need access to API endpoints, a middleware that configures the CORS headers is needed:

```tsx
import { createMiddleware } from "@solidjs/start/middleware";

const TRUSTED_ORIGINS = ["https://my-app.com", "https://another-app.com"];

export default createMiddleware([
	async (event, next) => {
		const origin = event.req.headers.get("Origin");
		const requestUrl = new URL(event.req.url);
		const isApiRequest = requestUrl && requestUrl.pathname.startsWith("/api");

		if (isApiRequest && origin && TRUSTED_ORIGINS.includes(origin)) {
			if (
				event.req.method === "OPTIONS" &&
				event.req.headers.get("Access-Control-Request-Method")
			) {
				return new Response(null, {
					headers: {
						"Access-Control-Allow-Origin": origin,
						"Access-Control-Allow-Methods": "OPTIONS, POST, PUT, PATCH, DELETE",
						"Access-Control-Allow-Headers": "Authorization, Content-Type",
						Vary: "Origin, Access-Control-Request-Method",
					},
				});
			}

			event.res.headers.set("Access-Control-Allow-Origin", origin);
		}

		event.res.headers.append("Vary", "Origin, Access-Control-Request-Method");
		return next();
	},
]);
```

## CSRF (Cross-Site Request Forgery)

To prevent basic CSRF attacks, a middleware can be used to block untrusted requests:

```tsx
import { createMiddleware } from "@solidjs/start/middleware";

const SAFE_METHODS = ["GET", "HEAD", "OPTIONS", "TRACE"];
const TRUSTED_ORIGINS = ["https://another-app.com"];

export default createMiddleware([
	(event, next) => {
		const request = event.req;

		if (!SAFE_METHODS.includes(request.method)) {
			const requestUrl = new URL(request.url);
			const origin = request.headers.get("Origin");

			// If we have an Origin header, check it against our allowlist.
			if (origin) {
				const parsedOrigin = new URL(origin);

				if (
					parsedOrigin.origin !== requestUrl.origin &&
					!TRUSTED_ORIGINS.includes(parsedOrigin.host)
				) {
					return Response.json({ error: "origin invalid" }, { status: 403 });
				}
			}

			// If we are serving via TLS and have no Origin header, prevent against
			// CSRF via HTTP man-in-the-middle attacks by enforcing strict Referer
			// origin checks.
			if (!origin && requestUrl.protocol === "https:") {
				const referer = request.headers.get("Referer");

				if (!referer) {
					return Response.json(
						{ error: "referer not supplied" },
						{ status: 403 }
					);
				}

				const parsedReferer = new URL(referer);

				if (parsedReferer.protocol !== "https:") {
					return Response.json({ error: "referer invalid" }, { status: 403 });
				}

				if (
					parsedReferer.host !== requestUrl.host &&
					!TRUSTED_ORIGINS.includes(parsedReferer.host)
				) {
					return Response.json({ error: "referer invalid" }, { status: 403 });
				}
			}
		}

		return next();
	},
]);
```

This example demonstrates a basic CSRF protection that verifies the `Origin` and `Referer` headers, blocking requests from untrusted origins.
**Please note both of these headers can be forged.**
Additionally, consider implementing a more robust CSRF protection mechanism, such as the [Double-Submit Cookie Pattern](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#alternative-using-a-double-submit-cookie-pattern).

For further guidance, you can look at the [Cross-Site Request Forgery Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).
