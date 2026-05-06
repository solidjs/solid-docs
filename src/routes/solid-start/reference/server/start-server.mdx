---
title: StartServer
use_cases: >-
  server entry, document rendering, html shell
tags:
  - server
  - rendering
  - component
version: "1.0"
description: >-
  StartServer renders the app inside a document component.
---

`StartServer` is a component that renders the generated app inside the provided document component.

## Import

```tsx
import { StartServer } from "@solidjs/start/server";
```

## Type

```tsx
type DocumentComponentProps = {
	assets: JSX.Element;
	scripts: JSX.Element;
	children?: JSX.Element;
};

function StartServer(props: {
	document: Component<DocumentComponentProps>;
}): JSX.Element;
```

## Props

### `document`

- **Type:** `Component<DocumentComponentProps>`
- **Optional:** No

Document component rendered around the app.

## Behavior

- Reads the current request event as a `PageEvent`.
- Registers page assets with `useAssets`.
- Renders `<!DOCTYPE html>` before the document component.
- Passes `assets`, `scripts`, and `children` to the document component.
- Wraps the app with error boundaries.

## Examples

### Basic usage

```tsx
import { createHandler, StartServer } from "@solidjs/start/server";

function Document(props) {
	return (
		<html>
			<head>{props.assets}</head>
			<body>
				<div id="app">{props.children}</div>
				{props.scripts}
			</body>
		</html>
	);
}

export default createHandler((event) => <StartServer document={Document} />);
```

## Related

- [`createHandler`](/solid-start/reference/server/create-handler)
