---
title: mount
use_cases: >-
  client entry, hydration, app mounting
tags:
  - client
  - hydration
  - entry
version: "1.0"
description: >-
  mount hydrates the client entry.
---

`mount` hydrates a client entry and includes island hydration handling.

## Import

```tsx
import { mount } from "@solidjs/start/client";
```

## Type

```tsx
function mount(
	fn: () => JSX.Element,
	el: MountableElement
): (() => void) | undefined;
```

## Parameters

### `fn`

- **Type:** `() => JSX.Element`
- **Required:** Yes

Function that returns the client app element.

### `el`

- **Type:** `MountableElement`
- **Required:** Yes

Element used as the hydration root.

## Return value

- **Type:** `(() => void) | undefined`

Returns the value from [`hydrate`](/reference/rendering/hydrate) for non-island builds. In island builds, it returns `undefined`.

## Behavior

- In non-island builds, [`hydrate`](/reference/rendering/hydrate) is called with `fn` and `el`.
- Island builds hydrate `solid-island[data-hk]` elements and do not call `hydrate(fn, el)`.
- CSS links listed in `data-css` are loaded when a matching `link[href]` is not already present.
- Islands with `data-when="idle"` hydrate through `requestIdleCallback` when it exists.

## Examples

### Basic usage

```tsx
import { mount, StartClient } from "@solidjs/start/client";

mount(() => <StartClient />, document.getElementById("app")!);
```

## Related

- [`hydrate`](/reference/rendering/hydrate)
- [`StartClient`](/solid-start/reference/client/start-client)
