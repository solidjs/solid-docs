---
title: createUniqueId
category: Component APIs
use_cases: >-
  form elements, accessibility, aria labels, ssr compatibility, html id
  generation, unique identifiers
tags:
  - ids
  - accessibility
  - ssr
  - forms
  - utilities
version: "1.0"
description: >-
  Generate a unique string for the current render or hydration context.
---

`createUniqueId` generates a unique string for the current render or hydration context.
During hydration, matching server and client call order produces matching IDs.

`createUniqueId` does _not_ generate a cryptographically secure ID and is not suitable for security-sensitive data.
Additionally, it should not be used in scenarios that require uniqueness across a distributed system.

:::note
`createUniqueId` relies on a counter-based mechanism to generate IDs.
It must be called the same number of times on both the server and client.

Calling `createUniqueId` only on the server or only on the client, such as when using [`isServer`](/reference/rendering/is-server) or [`<NoHydration>`](/reference/components/no-hydration), may lead to hydration errors.
:::

## Import

```ts
import { createUniqueId } from "solid-js";
```

## Type

```ts
function createUniqueId(): string;
```

## Parameters

This function does not take any parameters.

## Returns

`createUniqueId` returns a unique `string` that is stable across server and client renders.

## Behavior

- During hydration, IDs come from the current hydration context, so matching call order produces matching server and client IDs.
- Outside hydration context, client-side IDs use a local counter and are unique only within the current Solid runtime instance.

## Examples

### Basic Usage

```tsx
import { createUniqueId } from "solid-js";

type InputProps = {
	id?: string;
	label: string;
};

function Input(props: InputProps) {
	const inputId = props.id ?? createUniqueId();

	return (
		<>
			<label for={inputId}>{props.label}</label>
			<input id={inputId} />
		</>
	);
}
```
