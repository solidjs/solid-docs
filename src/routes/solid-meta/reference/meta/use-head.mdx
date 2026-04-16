---
title: useHead
order: 7
use_cases: >-
  custom head tags, scripts, json-ld, arbitrary head elements, head metadata
tags:
  - usehead
  - head
  - meta
  - primitive
version: "1.0"
description: >-
  useHead adds a custom head tag through Solid Meta.
---

`useHead` adds a custom head tag from a `TagDescription` object.

## Import

```tsx
import { useHead } from "@solidjs/meta";
```

## Type

```tsx
type TagDescription = {
	tag: string;
	props: Record<string, unknown>;
	setting?: {
		close?: boolean;
		escape?: boolean;
	};
	id: string;
	name?: string;
	ref?: Element;
};

function useHead(tag: TagDescription): void;
```

## Parameters

### Description object

- **Parameter:** `tag`
- **Type:** `TagDescription`
- **Required:** Yes

The object passed to `useHead`.

#### `tag`

- **Type:** `string`
- **Required:** Yes

Tag name to render in the document head.

#### `props`

- **Type:** `Record<string, unknown>`
- **Required:** Yes

Attributes, properties, and optional `children` applied to the rendered element.

#### `setting`

- **Type:** `{ close?: boolean; escape?: boolean }`
- **Required:** No

Server-rendering options for the tag.

##### `close`

- **Type:** `boolean`
- **Required:** No

When `true`, server rendering emits a closing tag and renders `props.children` between the opening and closing tags.

##### `escape`

- **Type:** `boolean`
- **Required:** No

When `true`, server rendering escapes `props.children`.

#### `id`

- **Type:** `string`
- **Required:** Yes

Identifier used to find server-rendered tags during hydration.

#### `name`

- **Type:** `string`
- **Required:** No

Optional label for the tag description.

#### `ref`

- **Type:** `Element`
- **Required:** No

Existing element reference used by Solid Meta when an element is reused.

## Return value

- **Type:** `void`

`useHead` does not return a value.

## Behavior

- Reads `MetaContext` and throws if no [`MetaProvider`](/solid-meta/reference/meta/metaprovider) is present.
- Registers the tag inside a render effect and removes it during cleanup.
- During client rendering, Solid Meta reuses an existing `[data-sm="<id>"]` element when one is present and has the same tag name.
- Server rendering flattens `props.children` arrays into a single string before output.

## Examples

### Basic usage

```tsx
import { createUniqueId } from "solid-js";
import { MetaProvider, useHead } from "@solidjs/meta";

function RssLink() {
	useHead({
		tag: "link",
		id: createUniqueId(),
		props: {
			rel: "alternate",
			type: "application/rss+xml",
			title: "Solid RSS",
			href: "/rss.xml",
		},
	});
}

export default function Root() {
	return (
		<MetaProvider>
			<RssLink />
		</MetaProvider>
	);
}
```

### Script contents

```tsx
import { createUniqueId } from "solid-js";
import { MetaProvider, useHead } from "@solidjs/meta";

function JsonLd() {
	const jsonLD = JSON.stringify({
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Solid Docs",
		url: "https://docs.solidjs.com/",
	});

	useHead({
		tag: "script",
		setting: { close: true, escape: false },
		id: createUniqueId(),
		props: {
			type: "application/ld+json",
			children: jsonLD,
		},
	});
}

export default function Root() {
	return (
		<MetaProvider>
			<JsonLd />
		</MetaProvider>
	);
}
```

## Related

- [`MetaProvider`](/solid-meta/reference/meta/metaprovider)
- [`Title`](/solid-meta/reference/meta/title)
- [`Meta`](/solid-meta/reference/meta/meta)
- [`Link`](/solid-meta/reference/meta/link)
- [`Style`](/solid-meta/reference/meta/style)
- [`Base`](/solid-meta/reference/meta/base)
