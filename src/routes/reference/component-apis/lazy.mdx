---
title: lazy
category: Component APIs
use_cases: >-
  code splitting, performance optimization, reducing bundle size, dynamic
  imports, route-based splitting, lazy loading
tags:
  - lazy-loading
  - code-splitting
  - performance
  - suspense
  - optimization
  - imports
version: "1.0"
description: >-
  Create a component that loads its module lazily from a dynamic import.
---

`lazy` wraps a dynamic import and returns a component that loads its module on demand.
The returned component accepts the same props as the loaded component and exposes `preload()`.

## Import

```tsx
import { lazy } from "solid-js";
```

## Type

```ts
function lazy<T extends Component<any>>(
	fn: () => Promise<{ default: T }>
): T & { preload: () => Promise<{ default: T }> };
```

## Parameters

### `fn`

- **Type:** `() => Promise<{ default: T }>`
- **Required:** Yes

Dynamic import that resolves to the component module, exposing the component as the `default` export.

## Return value

- **Type:** `T & { preload: () => Promise<{ default: T }> }`

Returns a renderable component compatible with `T`.
The returned component also exposes `preload()`.

`preload()` starts loading the module without rendering the component and returns the resolved module.

## Behavior

- Rendering a lazy component starts loading its module if it has not already been loaded.
- Inside a [`<Suspense>`](/reference/components/suspense) boundary, the boundary shows its fallback while the module is loading.
- Without a suspense boundary, the lazy component renders an empty string until the module resolves.
- `preload()` starts the same module request without rendering the component.

## Examples

### Basic usage

```tsx
import { lazy, Suspense } from "solid-js";

const ComponentA = lazy(() => import("./ComponentA"));

function App(props: { title: string }) {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<ComponentA title={props.title} />
		</Suspense>
	);
}
```

### Preloading nested lazy components

```tsx
import { createSignal, lazy, Show, Suspense } from "solid-js";

const Nested = lazy(() => import("./Nested"));

const ComponentWithPreload = () => {
	const [showNested, setShowNested] = createSignal(false);

	return (
		<div>
			<button
				onMouseEnter={() => Nested.preload()}
				onClick={() => setShowNested(true)}
			>
				Preload Nested Component
			</button>
			<Show when={showNested()}>
				<Suspense fallback={<p>Loading nested component...</p>}>
					<Nested />
				</Suspense>
			</Show>
		</div>
	);
};
```

## Related

- [`Suspense`](/reference/components/suspense)
- [Router preloading guide](/solid-router/advanced-concepts/preloading)
