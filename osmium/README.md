# Osmium

Official SolidJS docs theme for SolidBase.

## Installation

```sh
npm i solidbase-osmium
```

In your `vite.config.ts`:

```ts
import { osmium } from "solidbase-osmium";

const solidBase = createSolidBase(osmium);

export default defineConfig({
  ...solidBase.startConfig({
    ...
  }),
  plugins: [solidBase.plugin({ ... })],
})
````

More information in the [SolidBase docs for consuming a theme.](https://solidbase.dev/guide/customization/custom-themes#consuming-a-theme)
