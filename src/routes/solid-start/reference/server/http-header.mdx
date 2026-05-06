---
title: HttpHeader
use_cases: >-
  response headers, server rendering, header cleanup
tags:
  - server
  - headers
  - component
version: "1.0"
description: >-
  HttpHeader sets or appends a response header during server rendering.
---

`HttpHeader` is a component that sets or appends a response header on the server.

## Import

```tsx
import { HttpHeader } from "@solidjs/start";
```

## Type

```tsx
interface HttpHeaderProps {
	name: string;
	value: string;
	append?: boolean;
}

const HttpHeader: (props: HttpHeaderProps) => null;
```

## Props

### `name`

- **Type:** `string`
- **Optional:** No

Header name.

### `value`

- **Type:** `string`
- **Optional:** No

Header value.

### `append`

- **Type:** `boolean`
- **Optional:** Yes

Controls whether the value is appended instead of set.

## Behavior

- On the server, the current request event is read.
- Truthy `append` calls `event.response.headers.append(name, value)`, while falsy `append` calls `event.response.headers.set(name, value)`.
- During cleanup, its own header value is removed unless the event has already completed or been handled.
- Client rendering returns `null`.

## Examples

### Basic usage

```tsx
import { HttpHeader } from "@solidjs/start";

export default function Page() {
	return <HttpHeader name="cache-control" value="max-age=60" />;
}
```
