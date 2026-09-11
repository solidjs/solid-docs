---
title: "Styling and assets"
version: "2.0"
description: "Style a component with global CSS, a CSS module, Tailwind, or an inline style object, toggle classes without string building, and reference images so the built URL is hashed."
---

The product card needs a border and the header needs the store logo.
In a Vite single-page app the reflex is a `<link rel="stylesheet">` in `index.html` and an `<img src="/src/logo.svg">`.
A start-mode project has no `index.html`, and `src/` is not served in production, so neither reflex has anywhere to go.

Everything reaches the page through imports instead.
Import a stylesheet and Vite includes it in the build; import an image and the import is its final, hashed URL.
Solid adds nothing to that pipeline; what it adds is the `class` and `style` props that apply the result.

Most apps need the first two sections: one global stylesheet for layout and typography, and a CSS module per component.
The rest of the page covers the other approaches and where files that must keep a fixed URL go.

## Pick a styling approach

### Global CSS

Every template imports one stylesheet for its side effect:

```tsx
// src/App.tsx
import "./App.css";
```

Its rules apply to the whole document.
Where you import it does not scope it: a stylesheet imported from one route module still applies to every page once that module has loaded.
Use it for resets, typography, and layout.

### CSS modules

Name the file `*.module.css` and import the class map:

```css
/* src/components/ProductCard.module.css */
.card {
	border-radius: 0.5rem;
	padding: 1rem;
}
```

```tsx
// src/components/ProductCard.tsx
import styles from "./ProductCard.module.css";

export function ProductCard(props: { name: string }) {
	return <article class={styles.card}>{props.name}</article>;
}
```

Inspect the rendered `<article>` and its class is a generated name, not `card`.
Two components can each have a `.card` rule without colliding, which is why this is the default for component-level styles.

### Tailwind

Tailwind works through its own Vite plugin with no Solid-specific setup.
The `with-tailwindcss` template adds the plugin and one import:

```ts
// vite.config.ts
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [solid({ start: true }), fileRoutes(), tailwindcss()],
});
```

```css
/* src/App.css */
@import "tailwindcss";
```

### Sass and other preprocessors

Install the compiler and change the extension.
The `with-sass` template renames `App.css` to `App.scss` and updates the import; `*.module.scss` combines a preprocessor with a CSS module.
The preprocessor runs at build time and ships nothing to the browser.

## Conditional classes and inline styles

Whichever approach supplies the names, the `class` prop takes an object or an array so a component can toggle classes without building a string:

```tsx
// Avoid: a string is replaced as a whole on every change
<li class={`${styles.row} ${props.selected ? styles.selected : ""}`}>…</li>

// Prefer: an object toggles the affected tokens
<li class={{ [styles.row]: true, [styles.selected]: props.selected }}>…</li>
```

With the `Avoid` version, every change to `props.selected` rewrites the complete `class` attribute.
With the object form, Solid adds and removes only the `selected` token.

A string is applied as the complete value, an object adds each key whose value is truthy, and an array combines the two:

```tsx
<button class={["btn", { "btn-primary": props.primary }]}>Add to cart</button>
```

`style` takes an object of CSS declarations and updates only the declarations that change:

```tsx
<div style={{ width: `${progress()}%`, "background-color": color() }} />
```

Both props are read reactively when given a function or a tracked value.
The [`class`](/reference/solid-web/jsx-properties/class) and [`style`](/reference/solid-web/jsx-properties/style) reference pages cover the object forms in detail, including how they interact with stores.

## Images and other files

Import a file when code needs its URL:

```tsx
import logo from "../logo.svg";

<img src={logo} alt="Store logo" />;
```

In the built page, `src` is a path such as `/assets/logo-BKhbptE1.svg`.
Vite hashed the file into `dist/client`, so a changed logo gets a new URL and no cache can serve the old one.

:::tip[Small images stay files in the templates]
The templates set `build.assetsInlineLimit: 0` so icons and small images stay as files rather than being inlined as `data:` URLs in the JavaScript.
Remove that setting if you prefer inlining for icons.
:::

Append `?url` to import something as a URL that Vite would otherwise process, such as a stylesheet you want to link rather than inject:

```tsx
import themeHref from "./theme.css?url";

<link rel="stylesheet" href={themeHref} />;
```

Files that need a fixed, unhashed path go in `public/` and are referenced by root-relative URL.
The `basic` template keeps `favicon.ico` there and fetches `public/users.json` as `/users.json`:

```tsx
<link rel="icon" href="/favicon.ico" />
```

Use `public/` for things an outside party finds by name: `robots.txt`, a well-known file, an image referenced from an email.
Import everything else.

A stylesheet imported by a lazy route module loads with that module's chunk.
For a page that must be styled before its JavaScript arrives, import its CSS from a module that is always loaded, or add a `<link>` for it through [head metadata](/building-apps/head-and-metadata).

:::deep-dive[Where styles end up under streaming SSR]
In production, the CSS reachable from `App` and `Document` is built into asset files, and the generated handler writes `<link rel="stylesheet">` tags for them into the document head, so the first HTML the browser receives already references the styles.
Imported asset URLs point at their hashed output.

In development, the dev server inlines the reachable CSS into the server-rendered page so the first paint is styled, then Vite's client takes over for hot updates and the server-rendered copy is removed.
You may briefly see two `<style>` elements for the same file in the inspector during that handoff; that is expected.
:::

## Common problems

### A CSS module class is `undefined`

The file is not named `*.module.css`, or the class name is not a valid identifier.
`styles["product-card"]` works; `styles.product-card` does not.

### Styles from one page leak into another

The stylesheet is global CSS imported from a route module.
Switch to a CSS module, or scope the selectors under a page-level class.

### An imported image has a `data:` URL

It was small enough to inline.
Set `build.assetsInlineLimit: 0`, as the templates do, or move it to `public/`.

### A `public/` file 404s in production

The host is not serving `dist/client` for that path.
[Deployment](/building-apps/deployment#a-public-file-404s-in-production) shows how each host maps static files.

## Recap

- Import stylesheets and images; there is no `index.html` to link them from and `src/` is not served in production.
- One global stylesheet for resets and layout; a `*.module.css` per component for names that cannot collide.
- Pass `class` an object or array to toggle names; a string is replaced as a whole on every change.
- Pass `style` an object of declarations; only the changed declarations are written.
- An imported file's URL is hashed, so a changed file cannot be served from cache.
- Put a file in `public/` only when something outside the app needs its fixed name.
- A stylesheet imported by a lazy route loads with that route; import it from an always-loaded module when it must be there first.

## Next steps

- [Head and metadata](/building-apps/head-and-metadata): stylesheet links and other head tags a page adds on its own.
- [Deployment](/building-apps/deployment): where built assets land and how each host serves `dist/client`.
- [`class`](/reference/solid-web/jsx-properties/class) and [`style`](/reference/solid-web/jsx-properties/style): the object and array forms and how they interact with stores.
