---
title: "solidPlugin"
category: "@solidjs/vite-plugin"
order: 1
version: "2.0"
description: "Configures Solid JSX compilation and the optional serving and server-function modes."
source_repo: "solidjs/solid-vite-plugin"
source_ref: "next"
source_path: "src/index.ts"
---

`solidPlugin` configures Solid compilation and returns the Vite plugins needed by the selected modes.

## Import

```ts
import solidPlugin from "@solidjs/vite-plugin";
```

## Signature

```ts
function solidPlugin(options?: Partial<Options>): Plugin[];
```

## `Options`

```ts
interface Options {
	include?: FilterPattern;
	exclude?: FilterPattern;
	dev?: boolean;
	ssr?: boolean;
	start?: boolean | StartOptions;
	compiler?: "babel" | "native";
	hot?: boolean;
	extensions?: (string | [string, ExtensionOptions])[];
	babel?:
		| babel.TransformOptions
		| ((source: string, id: string, ssr: boolean) => babel.TransformOptions)
		| ((
				source: string,
				id: string,
				ssr: boolean
		  ) => Promise<babel.TransformOptions>);
	solid?: SolidOptions;
	serverFunctions?: boolean | ServerFunctionsOptions;
	refresh?: RefreshOptions;
}
```

### `include`

- **Type:** `FilterPattern`
- **Default:** `undefined`

Limits transformed files with Vite filter patterns.
Relative patterns resolve against the Vite root.

### `exclude`

- **Type:** `FilterPattern`
- **Default:** `undefined`

Excludes files with Vite filter patterns.
Relative patterns resolve against the Vite root.

### `dev`

- **Type:** `boolean`
- **Default:** Enabled for Vite's `serve` command

Selects the development exports of `solid-js` and `@solidjs/web`.
Set `true` to select them outside `serve`, or `false` to disable that selection during `serve`.

### `ssr`

- **Type:** `boolean`
- **Default:** `false`

Enables hydratable client output and SSR output.
With [`start`](/reference/vite-plugin-solid/start), `ssr: true` selects SSR start mode instead of client start mode.
The plugin rejects an object value at configuration time.

### `start`

- **Type:** `boolean | StartOptions`
- **Default:** `undefined`

Enables start mode.
`true` and `{}` are equivalent.
See [`StartOptions`](/reference/vite-plugin-solid/start).

### `compiler`

- **Type:** `Compiler = "babel" | "native"`
- **Default:** `"native"`

Selects the JSX compiler.
Both values use `@dom-expressions/compiler` for the `lazy()` module URL, refresh, and server-function passes.
`"babel"` uses `babel-preset-solid` for the JSX pass.
The native compiler loader uses its WebAssembly fallback when the platform has no native binary.

### `hot`

- **Type:** `boolean`
- **Default:** `true` during development
- **Deprecated:** Use `refresh.disabled`

Set `false` to disable the refresh transform and runtime.
Production output is unaffected.

### `refresh`

```ts
interface RefreshOptions {
	disabled?: boolean;
	granular?: boolean;
}
```

`disabled` disables the development refresh transform.
`granular` controls component signature and dependency metadata and defaults to `true`.

### `extensions`

```ts
interface ExtensionOptions {
	typescript?: boolean;
}
```

- **Type:** `(string | [string, ExtensionOptions])[]`
- **Default:** No additional extensions

Registers extensions in addition to `.jsx` and `.tsx`.
A tuple marks an extension for TypeScript parsing.

```ts
solidPlugin({
	extensions: [".mdx", [".page", { typescript: true }]],
});
```

### `babel`

- **Type:** `babel.TransformOptions` or a synchronous or asynchronous options factory
- **Default:** `{}`

Merges Babel options into the transform.
With the native JSX compiler, providing this option adds a Babel support pass before native JSX compilation.
The factory receives the source, clean file ID, and SSR-transform flag.

### `solid`

```ts
type SolidOptions = Omit<JsxCompilerOptions, "filename" | "sourceMap">;
```

- **Default:** `{}`

Overrides DOM Expressions compiler options after the plugin defaults.
The defaults include `moduleName: "@solidjs/web"`, Solid's built-in components, custom-element context, conditional wrapping, mode-specific `generate` and `hydratable`, and the resolved development flag.

### `serverFunctions`

- **Type:** `boolean | ServerFunctionsOptions`
- **Default:** `undefined`

Enables `"use server"` compilation.
`true` uses all defaults.
See [`ServerFunctionsOptions`](/reference/vite-plugin-solid/server-functions).

## Transform output

- Plain client builds use DOM output without hydration markers.
- `ssr: true` uses hydratable DOM output for client transforms and hydratable SSR output for server transforms.
- Client start mode keeps application code non-hydratable.
  Only the document shell receives an SSR transform.
- Vitest defaults to client conditions, DOM output, and `jsdom`.
  A project with `test.environment: "node"` or `"edge-runtime"` receives server conditions and SSR output.

The plugin always installs the `server-only` and `client-only` boundary resolvers.
