---
title: Script
order: 6
use_cases: >-
  json-ld, structured data, analytics scripts, head scripts
tags:
  - script
  - json-ld
  - structured-data
  - head
  - component
version: "1.0"
source_repo: "solidjs/solid-meta"
source_ref: "next"
source_path: "src/index.ts"
description: >-
  Script adds a script element to the document head through Solid Meta.
---

`Script` adds a [`<script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) element to the document head, including inline bodies.
Structured data via JSON-LD (`type="application/ld+json"`) is the marquee use case.

:::note[New in 1.0]
`Script` did not exist in `@solidjs/meta` 0.x — head scripts previously required the 0.x `useHead` escape hatch.
:::

## Import

```tsx
import { Script } from "@solidjs/meta";
```

## Type

```tsx
const Script: Component<
	JSX.ScriptHTMLAttributes<HTMLScriptElement> & { key?: string }
>;
```

## Props

Accepts attributes for [`<script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script).

### `children`

- **Type:** `JSX.Element`
- **Optional:** Yes

Text body of the `script` element.
Applied via `textContent`, so it is always escaped.
Can be a reactive expression.

### `key`

- **Type:** `string`
- **Optional:** Yes

Overrides the default identity used for deduplication.

## Behavior

- Scripts with a `src` dedupe by URL and are treated as resources: they render immediately and are not retracted on unmount.
- Keyless inline scripts are append-only: each one adds its own element, and unmounting removes it.
- Give a `key` to make an inline script replaceable — later registrations with the same `key` override it, and unmounting restores the previous body.

## Examples

### JSON-LD structured data

```tsx
import { Script } from "@solidjs/meta";

export default function Product(props: {
	product: () => { name: string; price: number };
}) {
	return (
		<Script type="application/ld+json">
			{JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Product",
				name: props.product().name,
				offers: { "@type": "Offer", price: props.product().price },
			})}
		</Script>
	);
}
```

## Related

- [`Style`](/reference/solid-meta/style)
- [`Head`](/reference/solid-meta/head)
