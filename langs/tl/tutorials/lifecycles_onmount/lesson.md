There are only few Lifecycles in Solid as everything lives and dies by the reactive system. The reactive system is created and updates synchronously, so the only scheduling comes down to Effects which are pushed to the end of the update.

We've found that developers doing simple tasks don't often think this way, so to make things a little easier we've aliased a non-tracking (never reruns) `createEffect` call with `onMount`. It is just an Effect call but you can use it with confidence that it will run only once for your component, once all initial rendering is done.

Let's use the `onMount` hook to fetch some photos:
```js
onMount(async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
  setPhotos(await res.json());
});
```

Lifecycles are only run in the browser, so putting code in `onMount` has the benefit of not running on the server during SSR. Even though we are doing data fetching in this example, usually we use Solid's resources for true server/browser coordination.
