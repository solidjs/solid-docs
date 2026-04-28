---
title: observable
category: Reactive Utilities
use_cases: >-
  rxjs integration, observable patterns, signal interop, third-party libraries,
  reactive streams
tags:
  - observables
  - rxjs
  - signals
  - integration
  - reactive
  - streams
version: "1.0"
description: >-
  Convert a Solid accessor into an Observable-compatible object.
---

`observable` creates an Observable-compatible object from a Solid accessor.

## Import

```ts
import { observable } from "solid-js";
```

## Type

```ts
function observable<T>(input: () => T): Observable<T>;
```

## Parameters

### `input`

- **Type:** `() => T`
- **Required:** Yes

Accessor used as the observable source.

## Return value

- **Type:** `Observable<T>`

Returns an object with `subscribe()` and `[Symbol.observable]()` that returns the same object.

## Behavior

- `subscribe()` accepts either a function observer or an object observer with `next`.
- Each subscription creates an effect over the accessor and returns an object with `unsubscribe()`.
- If subscription happens inside an owned Solid scope, cleanup is also registered on that owner.

## Examples

### Convert an accessor to an Observable-compatible source

```ts
import { createSignal, observable } from "solid-js";
import { from } from "rxjs";

const [value] = createSignal(0);

const value$ = from(observable(value));

value$.subscribe((next) => console.log(next));
```

## Related

- [`from`](/reference/reactive-utilities/from)
