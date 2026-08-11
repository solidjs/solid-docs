---
title: Link
order: 3
use_cases: >-
  canonical links, favicons, preload hints, stylesheets, alternate links
tags:
  - link
  - head
  - favicon
  - preload
  - component
version: "1.0"
source_repo: "solidjs/solid-meta"
source_ref: "next"
source_path: "src/index.ts"
description: >-
  Link adds a link element to the document head through Solid Meta.
---

`Link` adds a [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) element to the document head.

## Import

```tsx
import { Link } from "@solidjs/meta";
```

## Type

```tsx
const Link: Component<
	JSX.LinkHTMLAttributes<HTMLLinkElement> & { key?: string }
>;
```

## Props

Accepts attributes for [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link).
Attribute values can be reactive expressions.

### `key`

- **Type:** `string`
- **Optional:** Yes

Overrides the default identity used for deduplication.

## Behavior

- Dedupes by `rel` + `href`: the last-registered tag wins and unmounting restores the previous one.
- **Icons** (`rel="icon"`, `rel="apple-touch-icon"`) dedupe by `rel` + `sizes` + `type` instead — deliberately excluding `href`.
  Swapping the `href` _replaces_ the favicon rather than accumulating, while size and type variants coexist.
- **Resource rels** (`preload`, `modulepreload`, `prefetch`, `preconnect`, `dns-prefetch`) render immediately and are never retracted — a fetch hint cannot be meaningfully undone.
- **Stylesheets** (`rel="stylesheet"`) are emitted eagerly (SSR streams them as soon as they register) and removed when their owner disposes.

## Examples

### Canonical link

```tsx
import { Link } from "@solidjs/meta";

export default function Page() {
	return <Link rel="canonical" href="https://solidjs.com/" />;
}
```

### Per-route favicon

Because icon identity excludes `href`, this replaces the site favicon while the route is mounted and restores the previous one on leave:

```tsx
import { Link } from "@solidjs/meta";

export default function Inbox(props: { unread: () => number }) {
	return (
		<Link
			rel="icon"
			href={props.unread() > 0 ? "/favicon-badge.ico" : "/favicon.ico"}
		/>
	);
}
```

## Related

- [`Stylesheet`](/reference/solid-meta/stylesheet)
- [`Meta`](/reference/solid-meta/meta)
