---
title: "textContent"
category: "JSX properties"
use_cases: "rendering plain text, optimized text updates"
tags:
  - "textcontent"
  - "jsx"
  - "dom"
  - "text"
  - "reference"
  - "v2"
version: "2.0"
description: "Writes plain text as an element's complete contents through an optimized text-only path."
source_repo: "ryansolid/dom-expressions"
source_ref: "next"
source_path: "packages/compiler/src/dom/attrs.rs"
---

`textContent` writes a string or number as an element's complete contents.
The browser treats the value as text and does not parse it as HTML.

## Type

```ts
textContent?: string | number;
```

`textContent` is available on intrinsic DOM elements.
It does not require an import.

## Usage

```tsx
function Status(props: { message: string }) {
	return <p textContent={props.message} />;
}
```

A reactive expression updates the existing text node:

```tsx
import { createSignal } from "solid-js";

const [count, setCount] = createSignal(0);

return <output textContent={`Count: ${count()}`} />;
```

The compiler knows that the element contains only text.
For a dynamic value, it creates a text node and updates that node's character data directly instead of using the general child insertion path.
Use this property when the element's full contents are text and the explicit text-only path is useful.
Ordinary JSX children remain clearer for most text:

```tsx
<output>Count: {count()}</output>
```

## Escaping

Markup in the value renders as text:

```tsx
<p textContent={"<strong>Not bold</strong>"} />
```

Server rendering also escapes the value.
Use [`innerHTML`](/reference/solid-web/jsx-properties/inner-html) only when the value contains trusted or sanitized markup that the browser should parse.

## Children

Do not combine `textContent` with JSX children.
Both define the element's complete contents, so their updates can conflict.
