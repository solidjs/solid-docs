---
title: useSearchParams
use_cases: >-
  query parameters, search params, pagination, filters
tags:
  - search
  - query
  - params
  - url
version: "1.0"
description: >-
  useSearchParams returns current query parameters and a query update function.
---

`useSearchParams` returns current query parameters and a setter for the URL search string.

## Import

```ts
import { useSearchParams } from "@solidjs/router";
```

## Type

```ts
type SearchParams = Record<string, string | string[] | undefined>;

type SetSearchParams = Record<
	string,
	string | string[] | number | number[] | boolean | boolean[] | null | undefined
>;

function useSearchParams<T extends SearchParams>(): [
	Partial<T>,
	(params: SetSearchParams, options?: Partial<NavigateOptions>) => void,
];
```

## Parameters

`useSearchParams` takes no arguments.

## Return value

`useSearchParams` returns a tuple with the following:

### `params`

- **Type:** `Partial<T>`

Reactive object containing the current query parameters.

### `setParams`

- **Type:** `(params: SetSearchParams, options?: Partial<NavigateOptions>) => void`

Function that merges values into the current search string, then navigates to the result.

## Behavior

- New values are merged with [`useLocation`](/solid-router/reference/primitives/use-location)'s `search`.
- Keys are deleted when the new value is `null`, `undefined`, an empty string, or an empty array.
- Array values append each item. Other values set the key to `String(value)`.
- The current hash is preserved after the merged search string.
- Navigation uses `scroll: false` and `resolve: false` unless those options are overridden.

## Examples

### Basic usage

```tsx
import { useSearchParams } from "@solidjs/router";

function Paginator() {
	const [params, setParams] = useSearchParams();

	const page = () => Number(params.page || "1");

	return (
		<div>
			<span>Current Page: {page()}</span>
			<button onClick={() => setParams({ page: page() + 1 })}>Next</button>
		</div>
	);
}
```

## Related

- [`useParams`](/solid-router/reference/primitives/use-params)
- [`useLocation`](/solid-router/reference/primitives/use-location)
- [`useNavigate`](/solid-router/reference/primitives/use-navigate)
