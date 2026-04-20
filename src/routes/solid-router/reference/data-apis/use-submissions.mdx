---
title: useSubmissions
use_cases: >-
  action submissions, submission arrays, pending actions
tags:
  - submissions
  - actions
  - pending
version: "1.0"
description: >-
  useSubmissions returns tracked submissions for an action.
---

`useSubmissions` returns a reactive array-like proxy for submissions created by a matching action.

## Import

```tsx
import { useSubmissions } from "@solidjs/router";
```

## Type

```tsx
type Submission<T, U> = {
	readonly input: T;
	readonly result?: U;
	readonly error: any;
	readonly pending: boolean;
	readonly url: string;
	clear: () => void;
	retry: () => void;
};

function useSubmissions<T extends Array<any>, U, V>(
	fn: Action<T, U, V>,
	filter?: (input: V) => boolean
): Submission<T, NarrowResponse<U>>[] & { pending: boolean };
```

## Parameters

### `fn`

- **Type:** `Action<T, U, V>`
- **Required:** Yes

Action whose submissions are returned.

### `filter`

- **Type:** `(input: V) => boolean`
- **Required:** No

Function that receives each submission input.
Records are included when it returns `true`.

## Return value

`useSubmissions` returns an array-like object of submissions with an additional `pending` property.

### `pending`

- **Type:** `boolean`

`true` when at least one matching submission has no result value.

### Submission records

#### `input`

- **Type:** `T`

Arguments from the original call.

#### `result`

- **Type:** `NarrowResponse<U> | undefined`

Value returned by the action.

#### `error`

- **Type:** `any`

Error thrown or rejected by the action.

#### `url`

- **Type:** `string`

URL used to match the record to its action.

#### `clear`

- **Type:** `() => void`

Function that removes the record.

#### `retry`

- **Type:** `() => void`

Function that runs the same call again.

## Behavior

- Filters router submissions by action URL.
- When `filter` is provided, only submissions whose input passes the filter are returned.
- The returned value is a proxy over the filtered submissions.

## Examples

### Basic usage

```tsx
import { For, Show } from "solid-js";
import { action, useSubmissions } from "@solidjs/router";

const addTodoAction = action(async (formData: FormData) => {
	// ... Sends the todo data to the server.
}, "addTodo");

function AddTodoForm() {
	const submissions = useSubmissions(addTodoAction);

	return (
		<div>
			<form action={addTodoAction} method="post">
				<input name="name" />
				<button type="submit">Add</button>
			</form>
			<For each={submissions}>
				{(submission) => (
					<div>
						<span>Adding "{submission.input[0].get("name")?.toString()}"</span>
						<Show when={submission.pending}>
							<span> (pending...)</span>
						</Show>
						<Show when={submission.result?.ok}>
							<span> (completed)</span>
						</Show>
						<Show when={!submission.result?.ok}>
							<span>{` (Error: ${submission.result?.message})`}</span>
							<button onClick={() => submission.retry()}>Retry</button>
						</Show>
					</div>
				)}
			</For>
		</div>
	);
}
```

### Filtering submissions

```tsx
import { useSubmissions } from "@solidjs/router";

const addTodoAction = action(async (formData: FormData) => {
	// ... Sends the todo data to the server.
}, "addTodo");

function FailedTodos() {
	const failedSubmissions = useSubmissions(
		addTodoAction,
		([formData]: [FormData]) => {
			// Filters for submissions that failed a client-side validation
			const name = formData.get("name")?.toString() ?? "";
			return name.length <= 2;
		}
	);

	return (
		<div>
			<p>Failed submissions:</p>
			<For each={failedSubmissions}>
				{(submission) => (
					<div>
						<span>{submission.input[0].get("name")?.toString()}</span>
						<button onClick={() => submission.retry()}>Retry</button>
					</div>
				)}
			</For>
		</div>
	);
}
```

- [`action`](/solid-router/reference/data-apis/action)
- [`useSubmission`](/solid-router/reference/data-apis/use-submission)
