---
title: renderToString
category: Rendering
use_cases: >-
  synchronous server rendering, HTML generation, progressive hydration output
tags:
  - ssr
  - rendering
  - hydration
  - synchronous
version: "1.0"
description: >-
  Render HTML to a string synchronously on the server.
---

`renderToString` renders HTML to a string synchronously on the server.

## Import

```ts
import { renderToString } from "solid-js/web";
```

## Type

```ts
function renderToString<T>(
	fn: () => T,
	options?: {
		nonce?: string;
		renderId?: string;
	}
): string;
```

## Parameters

### `fn`

- **Type:** `() => T`

Function that returns the root output to render.

### `options`

#### `nonce`

- **Type:** `string`

Nonce applied to inline scripts emitted during rendering.

#### `renderId`

- **Type:** `string`

Identifier used to namespace the render output.

## Return value

- **Type:** `string`

Rendered HTML string.

## Behavior

- `renderToString` is a server rendering API, is unsupported in browser bundles, and completes synchronously.
- It returns the current render output without waiting for async suspense boundaries to settle.
- The output includes hydration markup. Inline serialized scripts are emitted only when serializer data is produced.
- Registered assets are injected into the HTML output, typically before `</head>`.
- `renderId` namespaces the render output when multiple top-level roots are present.

## Examples

### Basic usage

```tsx
import { renderToString } from "solid-js/web";

const html = renderToString(() => <App />);
```

## Related

- [`renderToStringAsync`](/reference/rendering/render-to-string-async)
- [`renderToStream`](/reference/rendering/render-to-stream)
