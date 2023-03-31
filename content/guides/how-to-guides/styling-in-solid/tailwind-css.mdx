<Title>Tailwind CSS</Title>

Tailwind CSS is an on demand utility CSS library. Tailwind CSS integrates with Solid as builtin PostCSS plugin.

## Install Tailwind CSS

```sh
# Install (choose one)
npm i --save-dev tailwindcss postcss autoprefixer
pnpm i --save-dev tailwindcss postcss autoprefixer   # Using pnpm
yarn add --dev tailwindcss postcss autoprefixer # Using yarn

# Initialize
npx tailwindcss init -p
```

## Create a configuration

Tailwind CSS is a configuration-based tool. Use the initialize command above or create `tailwind.config.js` at the root of your project directory. It should look something like this:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Consult the offical docs for more information on configuration: [Tailwind Official Documentation](https://tailwindcss.com/docs/guides/solidjs).

## Add Tailwind Directives

Tailwind is composed of three layers: the base layer, component layer, and utilities layer. Add these lines of code to your `src/index.css` file:

```diff
# src/index.css

+ @tailwind base;
+ @tailwind components;
+ @tailwind utilities;
```

This is a hint to PostCSS that we are using Tailwind and communicates to Tailwind which directives we are using and what their order is. Unless you know what you’re doing, you should probably not change this code. But you can still append custom CSS below these directives. Note that this file will be compiled as PostCSS.

## Import Tailwind CSS

Make sure that `index.css` is imported in your root `index.jsx` or `index.tsx` file. If it isn't, add `import "./index.css"` to `index.jsx` or `index.tsx`:

```diff
# src/index.jsx

import { render } from 'solid-js/web'; import App from './App';
+ import "./index.css"

render(() => <App />, document.getElementById('root') as HTMLElement);
```

### Usage

Now that we've got TailwindCSS setup we can get rid of the styling within the `Card.css` file or just get rid of the file entirely.

```diff
/* src/components/Card.css */

- .grid { display: grid; }
- .grid.grid-center { place-items: center; }
- .screen { min-height: 100vh; }
-
- .card {
-   height: 160px;
-   aspect-ratio: 2;
-   border-radius: 16px;
-   background-color: white;
-   box-shadow: 0 0 0 4px hsl(0 0% 0% / 15%);
- }
```

Don't forget to remove the `Card.css` import from any component that might have it imported and make use of the styling classes provided by TailwindCSS.

```diff
/* src/components/Card.jsx */

- import "./Card.css"

function Card() {
  return (
    <>
+     <div class="grid place-items-center min-h-screen">
+       <div class="h-[160px] aspect aspect-[2] rounded-[16px] shadow-[0_0_0_4px_hsl(0_0%_0%_/_15%)]">Hello, world!</div>
      </div>
    </>
  );
}
```

## Support

For more support, see the [Taiwind CSS/Vite integration guide](https://tailwindcss.com/docs/guides/vite) or join the [offical Tailwind CSS](https://discord.com/invite/7NF8GNe) and [Solid JS](https://discord.com/invite/solidjs) Discord channels. 👋
