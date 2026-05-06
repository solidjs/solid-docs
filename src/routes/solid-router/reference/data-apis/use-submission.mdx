---
title: useSubmission
use_cases: >-
  latest submission, action submission, pending action
tags:
  - submission
  - actions
  - pending
version: "1.0"
description: >-
  useSubmission returns the latest tracked submission for an action.
---

`useSubmission` returns a proxy for the latest submission created by a matching [`action`](/solid-router/reference/data-apis/action).

## Import

```tsx
import { useSubmission } from "@solidjs/router";
```

## Type

```tsx
function useSubmission<T extends Array<any>, U, V>(
	fn: Action<T, U, V>,
	filter?: (input: V) => boolean
): Submission<T, NarrowResponse<U>> | SubmissionStub;
```

## Parameters

### `fn`

- **Type:** `Action<T, U, V>`
- **Required:** Yes

[`Action`](/solid-router/reference/data-apis/action) whose latest submission is returned.

### `filter`

- **Type:** `(input: V) => boolean`
- **Required:** No

Function used to filter submissions by input.

## Return value

`useSubmission` returns an object with the latest matching submission fields:

### `input`

- **Type:** `T | undefined`

Input passed to the action.

### `result`

- **Type:** `NarrowResponse<U> | undefined`

Value returned by the action.

### `error`

- **Type:** `any`

Error thrown or rejected by the action.

### `url`

- **Type:** `string | undefined`

URL used to match the action.

### `pending`

- **Type:** `boolean | undefined`

Whether the submission is still running.

### `clear`

- **Type:** `() => void`

Function that clears the latest submission when one exists.

### `retry`

- **Type:** `() => void`

No-op function on the returned proxy.

## Behavior

- Uses [`useSubmissions`](/solid-router/reference/data-apis/use-submissions) and reads the last matching submission.
- If there are no matching submissions, `clear` returns a no-op function.
- `retry` is always a no-op on the returned proxy.
- Other fields return data from the latest match, or `undefined` when there is no matching submission.

## Examples

### Basic usage

```tsx
import { Show } from "solid-js";
import { action, useSubmission } from "@solidjs/router";

const addTodo = action(async (data: URLSearchParams) => {
	return data.get("title")?.toString();
}, "addTodo");

function TodoForm() {
	const submission = useSubmission(addTodo);

	return (
		<form action={addTodo} method="post">
			<input name="title" />
			<button>Add todo</button>
			<Show when={submission.pending}>Saving...</Show>
		</form>
	);
}
```

## Related

- [`action`](/solid-router/reference/data-apis/action)
- [`useSubmissions`](/solid-router/reference/data-apis/use-submissions)
