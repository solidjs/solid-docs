Most bundlers (like Webpack, Rollup, Parcel, Vite) automatically handle code splitting when you use a dynamic import. Solid's `lazy` method allows us to wrap the component's dynamic import for deferred lazy loading. The output is a Component that can be used as normal in our JSX template with the exception that internally it dynamically loads the underlying imported code when it is rendered the first time, halting that branch of rendering until the code is available.

To use `lazy`, replace the import statement:
```js
import Greeting from "./greeting";
```
with:
```js
const Greeting = lazy(() => import("./greeting"));
```

This will likely still load too quickly to see. But you add a fake delay if you wish to make the loading more visible.

```js
const Greeting = lazy(async () => {
  // simulate delay
  await new Promise(r => setTimeout(r, 1000))
  return import("./greeting")
});
```
