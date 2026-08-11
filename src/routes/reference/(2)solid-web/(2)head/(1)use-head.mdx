---
title: "useHead"
category: "Head"
use_cases: "register document head tags, reactive metadata groups, library head integration"
tags:
  - "head"
  - "metadata"
  - "ssr"
  - "api"
  - "reference"
  - "v2"
version: "2.0"
description: "Registers one or more head tag descriptors with Solid's ambient head registry."
source_repo: "ryansolid/dom-expressions"
source_ref: "0.50.0-next.40"
source_path: "packages/runtime/src/client.d.ts"
---

`useHead` registers head tags with the ambient registry under the current reactive owner.
Disposing that owner removes its registration and restores the previous winning tags.

Solid Meta uses `useHead` internally.
Prefer Solid Meta components for common application metadata.
Use `useHead` for libraries, reactive descriptor groups, or tags that need lower-level control.

## Import

```ts
import { useHead } from "@solidjs/web";
```

## Type signature

```ts
function useHead(tag: HeadTag | HeadTag[] | (() => HeadTag | HeadTag[])): void;
```

## Register one tag

Descriptor prop values can be getters.
Solid tracks those reads and updates the winning tag in place.

```tsx
import { useHead } from "@solidjs/web";

function PageDescription(props: { description: string }) {
	useHead({
		tag: "meta",
		props: {
			name: "description",
			content: () => props.description,
		},
	});

	return null;
}
```

## Register a group

Pass an array when several tags form one replacement set.
Same-identity tags inside the array coexist.
A later group replaces the earlier set as one unit, and disposal restores the earlier set.

```tsx
useHead([
	{
		tag: "meta",
		props: { property: "og:image", content: "/wide.png" },
	},
	{
		tag: "meta",
		props: { property: "og:image", content: "/square.png" },
	},
]);
```

Pass a function when group membership changes reactively:

```tsx
useHead(() =>
	images().map((content) => ({
		tag: "meta",
		props: { property: "og:image", content },
	}))
);
```

Reactive updates keep the registration's original position in the override order.
Creating a new reactive owner inside a descriptor getter can consume different hydration IDs on the server and client.
Create helpers such as memos before calling `useHead`, then read them from the getter.

## Server rendering

During server rendering, winning tags are written into the document head.
Registrations discovered after the streaming shell can arrive as head patches with their boundary.
When a host owns the document, use the renderer's `onHead` option to receive the generated head markup.

During hydration, the server-flushed head state remains authoritative until hydration completes.
The client then applies reactive updates without replacing adopted tags unnecessarily.

## Related

- [`HeadTag`](/reference/solid-web/head/head-tag)
- [Head and metadata](/building-apps/head-and-metadata)
- [`Head`](/reference/solid-meta/head)
