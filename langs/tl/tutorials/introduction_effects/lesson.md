Signals are trackable values, but they are only one half of the equation. To complement those are observers that can be updated by those trackable values. An _effect_ is one such observer; it  runs a side effect that depends on signals.

An effect can be created by importing `createEffect` from `solid-js` and providing it a function. The effect automatically subscribes to any signal that is read during the function's execution and reruns when any of them change.

So let's create an Effect that reruns whenever `count` changes:

```jsx
createEffect(() => {
  console.log("The count is now", count());
});
```

To update our `count` Signal, we'll attach a click handler on our button:

```jsx
<button onClick={() => setCount(count() + 1)}>Click Me</button>
```

Now clicking the button writes to the console. This is a relatively simple example, but to understand how Solid works, you should imagine that every expression in JSX is its own effect that re-executes whenever its dependent signals change. This is how all rendering works in Solid: from Solid's perspective, *all rendering is just a side effect of the reactive system*.


> Effects that developers create with `createEffect` run after rendering has completed and are mostly used for scheduling updates that interact with the DOM. If you want to modify the DOM earlier, use [`createRenderEffect`](https://www.solidjs.com/docs/latest/api#createrendereffect).