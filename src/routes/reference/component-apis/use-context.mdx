---
title: useContext
category: Component APIs
use_cases: >-
  consuming context, accessing global state, avoiding prop drilling, theme
  access, auth state, shared data
tags:
  - context
  - providers
  - global-state
  - hooks
  - consumption
version: "1.0"
description: >-
  Read the current value of a context object created by `createContext`.
---

`useContext` reads the nearest provider value for a context object in the current owner tree.

## Import

```ts
import { useContext } from "solid-js";
```

## Type

```ts
interface Context<T> {
	id: symbol;
	Provider: (props: { value: T; children: any }) => any;
	defaultValue: T;
}

function useContext<T>(context: Context<T>): T;
```

## Parameters

### `context`

- **Type:** `Context<T>`
- **Required:** Yes

Context object created by [`createContext`](/reference/component-apis/create-context).

## Return value

- **Type:** `T`

Returns the value provided by the nearest matching `Context.Provider`.
If the context was created without a default value, `T` can include `undefined`.
If no provider is found, it returns the context's default value or `undefined`.

## Behavior

- `useContext` reads the nearest matching provider in the current owner tree.
- If no matching provider is found, it returns the default value from [`createContext`](/reference/component-apis/create-context), or `undefined` when no default value was supplied.
- A provider value of `undefined` is treated the same as a missing provider and returns the default value or `undefined`.

## Examples

### Read a context value

```tsx
import { createContext, useContext } from "solid-js";

const CounterContext = createContext<number>(0);

function CounterValue() {
	const value = useContext(CounterContext);

	return <span>{value}</span>;
}
```

### Throw when a provider is missing

This example checks for `undefined` when the context was created without a default value.

```ts
import { createContext, useContext } from "solid-js";

const CounterContext = createContext<number>();

function useCounterContext() {
	const context = useContext(CounterContext);

	if (context === undefined) {
		throw new Error("CounterContext is missing");
	}

	return context;
}
```

## Related

- [`createContext`](/reference/component-apis/create-context)
- [Context](/concepts/context)
