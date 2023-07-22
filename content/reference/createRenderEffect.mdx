<Title>createRenderEffect</Title>

```ts
function createRenderEffect<T>(fn: (v: T) => T, value?: T): void;
```

A render effect is a computation similar to a regular effect (as created by [`createEffect`](/references/api-reference/basic-reactivity/createeffect)), but differs in when Solid schedules the first execution of the effect function. While createEffect waits for the current rendering phase to be complete, `createRenderEffect` immediately calls the function. Thus the effect runs as DOM elements are being created and updated, but possibly before specific elements of interest have been created, and probably before those elements have been connected to the document. In particular, **refs** will not be set before the initial effect call. Indeed, Solid uses `createRenderEffect` to implement the rendering phase itself, including setting of **refs**.

Reactive updates to render effects are identical to effects: they queue up in response to a reactive change (e.g., a single signal update, or a batch of changes, or collective changes during an entire render phase) and run in a single [`batch`](/references/api-reference/reactive-utilities/batch) afterward (together with effects). In particular, all signal updates within a render effect are batched.

Here is an example of the behavior. (Compare with the example in [`createEffect`](/references/api-reference/basic-reactivity/createeffect).)

```ts
// assume this code is in a component function, so is part of a rendering phase
const [count, setCount] = createSignal(0);

// this effect prints count at the beginning and when it changes
createRenderEffect(() => console.log("count =", count()));
// render effect runs immediately, printing `count = 0`
console.log("hello");
setCount(1); // effect won't run yet
setCount(2); // effect won't run yet

queueMicrotask(() => {
  // now `count = 2` will print
  console.log("microtask");
  setCount(3); // immediately prints `count = 3`
  console.log("goodbye");
});

// --- overall output: ---
// count = 0   [this is the only added line compared to createEffect]
// hello
// count = 2
// microtask
// count = 3
// goodbye
```

Just like `createEffect`, the effect function gets called with an argument equal to the value returned from the effect function's last execution, or on the first call, equal to the optional second argument of createRenderEffect.

## Arguments

| Name    | Type          | Description                                            |
| :------ | :------------ | :----------------------------------------------------- |
| `fn`    | `(v: T) => T` | The effect function to be called.                      |
| `value` | `T`           | The initial value to be passed to the effect function. |

{/* TODO: Add code playground example */}
