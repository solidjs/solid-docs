---
title: useBeforeLeave
use_cases: >-
  navigation blocking, leave handlers, unsaved changes
tags:
  - navigation
  - lifecycle
  - prevent
  - route
version: "1.0"
description: >-
  useBeforeLeave registers a handler that runs before navigation leaves the current location.
---

`useBeforeLeave` registers a listener that will be called prior to leaving the current location.

## Import

```ts
import { useBeforeLeave } from "@solidjs/router";
```

## Type

```ts
interface BeforeLeaveEventArgs {
	from: Location;
	to: string | number;
	options?: Partial<NavigateOptions>;
	readonly defaultPrevented: boolean;
	preventDefault(): void;
	retry(force?: boolean): void;
}

function useBeforeLeave(listener: (event: BeforeLeaveEventArgs) => void): void;
```

## Parameters

### `listener`

- **Type:** `(event: BeforeLeaveEventArgs) => void`
- **Required:** Yes

Function called before navigation leaves the current location.

The listener receives one argument with these fields and methods:

| Name               | Type                                    | Default     | Description                                                                     |
| ------------------ | --------------------------------------- | ----------- | ------------------------------------------------------------------------------- |
| `from`             | `Location`                              | N/A         | Current location before the change.                                             |
| `to`               | `string \| number`                      | N/A         | Target passed to `navigate`.                                                    |
| `options`          | `Partial<NavigateOptions> \| undefined` | `undefined` | Options passed to `navigate`.                                                   |
| `preventDefault`   | `() => void`                            | N/A         | Blocks the route change.                                                        |
| `defaultPrevented` | `readonly boolean`                      | `false`     | `true` after this handler or an earlier leave handler calls `preventDefault()`. |
| `retry`            | `(force?: boolean) => void`             | N/A         | Retries the same navigation. Pass `true` to skip running leave handlers again.  |

## Return value

- **Type:** `void`

`useBeforeLeave` does not return a value.

## Behavior

- The subscription is tied to the current owner and is removed during cleanup.
- The event contains the current location in `from`, the next target in `to`, and navigation options in `options`.
- Calling `event.preventDefault()` sets `event.defaultPrevented` and blocks the current navigation.
- Calling `event.retry(true)` retries the same navigation and skips the before-leave lifecycle for that retry.

## Examples

### Basic usage

```tsx
import { useBeforeLeave } from "@solidjs/router";

function Editor(props: { isDirty: () => boolean }) {
	useBeforeLeave((event) => {
		if (props.isDirty() && !event.defaultPrevented) {
			event.preventDefault();
		}
	});

	return <form>{/* fields */}</form>;
}
```

## Related

- [`useNavigate`](/solid-router/reference/primitives/use-navigate)
- [`Router`](/solid-router/reference/components/router)
