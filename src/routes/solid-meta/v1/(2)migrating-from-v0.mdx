---
title: Migrating from 0.x
use_cases: >-
  existing project, migration, upgrade, metaprovider removal
tags:
  - migration
  - upgrade
  - metaprovider
  - breaking-changes
version: "1.0"
description: >-
  Migrate your application from @solidjs/meta 0.x to 1.0.
---

Solid Meta 1.0 was rebuilt as a thin layer over Solid 2.0's built-in head registry.
Most components keep their names and props, but the provider, the server plumbing, and the deduplication semantics changed.

## Migration steps

### Delete `<MetaProvider>`

The head registry is ambient — the provider and `MetaContext` no longer exist.
Remove the wrapper:

```tsx del={1,5,7}
import { MetaProvider } from "@solidjs/meta";

export default function App() {
	return (
		<MetaProvider>
			<Layout />
		</MetaProvider>
	);
}
```

### Delete server plumbing

The 0.x server flow — passing a `tags={[]}` array into `MetaProvider` and splicing `renderTags(tags)` into your template — is gone.
Rendering the document with `renderToString` / `renderToStream` splices the winning tags into `<head>` automatically, and tags registered under suspense boundaries stream to the client as patches.
If you assemble the HTML document yourself, use the `onHead` render option to receive the head markup instead.

### Review duplicate-tag semantics

0.x kept multiple `<Meta>` tags with the same `name` if their other attributes differed.
1.x dedupes by `name`/`property`/`http-equiv` (qualified by `media`) with last-wins.

For deliberate sets — multiple `og:image`s that should coexist — wrap them in [`<Head>`](/solid-meta/v1/reference/meta/head):

```tsx
<Head>
	<Meta property="og:image" content="/image-1.png" />
	<Meta property="og:image" content="/image-2.png" />
</Head>
```

To fork an identity that would otherwise collide, give each tag a distinct `key`.

### Update `useHead` calls

`useHead` is no longer exported from `@solidjs/meta` — the primitive belongs to Solid 2.0 itself.
Import it from `@solidjs/web`; it takes `HeadTag` descriptors (`{ tag, props, key? }`) — a single tag, an array (a group), or a function (a reactive group):

```tsx
import { useHead } from "@solidjs/web";

useHead({ tag: "meta", props: { name: "description", content: () => desc() } });
```

### Removed features

- **`escape` prop** — everything is escaped now; text is applied via `textContent`, so markup injection isn't possible.
- **`ref` and event handlers on head tags** — head tags are data, not managed elements. Query the DOM directly for the rare case that needs it.
- **Client-dynamic `<Base>` / `<Meta charset>`** — these are rendered into the server shell only, and are ignored (with a dev warning) on the client. A base or charset that changes after the document loaded is incoherent.
- **`noscript`** — excluded from the core tag union: author it statically in your document shell.

### New capabilities

- [`<Script>`](/solid-meta/v1/reference/meta/script) is new — JSON-LD and other head scripts no longer need the `useHead` escape hatch.
- [`<Head>`](/solid-meta/v1/reference/meta/head) groups child tags into one replacement set with reactive membership.
- Icons (`rel="icon"` / `rel="apple-touch-icon"`) are replaceable: swapping the `href` replaces the favicon rather than accumulating, and unmounting restores the previous one.
- `theme-color` variants with different `media` queries coexist.
