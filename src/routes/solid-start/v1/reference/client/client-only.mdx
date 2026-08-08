---
title: clientOnly
use_cases: >-
  client-only components, browser-only imports, fallback rendering
tags:
  - client
  - component
  - lazy
version: "1.0"
description: >-
  clientOnly creates a component that renders only on the client.
---

`clientOnly` wraps an async component import and returns a component that renders its fallback on the server.

## Import

```tsx
import { clientOnly } from "@solidjs/start";
```

## Type

```tsx
function clientOnly<T extends Component<any>>(
	fn: () => Promise<{ default: T }>,
	options?: { lazy?: boolean }
): (props: ComponentProps<T> & { fallback?: JSX.Element }) => any;
```

## Parameters

### `fn`

- **Type:** `() => Promise<{ default: T }>`
- **Required:** Yes

Function that imports the client component.

### `options`

- **Type:** `{ lazy?: boolean }`
- **Default:** `{}`
- **Required:** No

Loading options with the following properties:

### `lazy`

- **Type:** `boolean`
- **Required:** No

Controls whether the component import is loaded from inside the returned component.

## Return value

- **Type:** `(props: ComponentProps<T> & { fallback?: JSX.Element }) => any`

Returns a component for the imported default export.

## Behavior

- On the server, the returned component renders `props.fallback`.
- Client rendering loads `fn` immediately unless `options.lazy` is truthy.
- `fallback` is split from the remaining props before the loaded component renders.
- During hydration, rendering waits until mount.

## Examples

### Basic usage

```tsx
import { clientOnly } from "@solidjs/start";

const Map = clientOnly(() => import("./Map"), {
	lazy: true,
});

export default function Page() {
	return <Map fallback={<p>Loading map...</p>} />;
}
```
