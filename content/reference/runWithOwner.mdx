<Title>runWithOwner</Title>

```ts
function runWithOwner<T>(owner: Owner, fn: (() => void) => T): T;
```

Executes the given function under the provided owner, instead of (and without affecting) the owner of the outer scope. By default, computations created by `createEffect`, `createMemo`, etc. are owned by the owner of the currently executing code (the return value of `getOwner`), so in particular these will get disposed when their owner does. Calling `runWithOwner` provides a way to override this default to a manually specified owner (typically, the return value from a previous call to `getOwner`), enabling more precise control of when computations get disposed.

Having a (correct) owner is important for two reasons:

* Computations without an owner cannot be cleaned up. For example, if you call `createEffect` without an owner (e.g., in the global scope), the effect will continue running forever, instead of being disposed when its owner gets disposed.
* useContext obtains context by walking up the owner tree to find the nearest ancestor providing the desired context. So without an owner you cannot look up any provided context (and with the wrong owner, you might obtain the wrong context).

Manually setting the owner is especially helpful when doing reactivity outside of any owner scope. In particular, asynchronous computation (via either `async` functions or callbacks like `setTimeout`) lose their automatically set owner, so remembering the original owner via `getOwner` and restoring it via `runWithOwner` is necessary in these cases. For example:

```ts 
const owner = getOwner();
setTimeout(() => {
  // This callback gets run without owner.
  // Restore owner via runWithOwner:
  runWithOwner(owner, () => {
    const foo = useContext(FooContext);
    createEffect(() => {
      console.log(foo);
    });
  });
}, 1000);
```

Note that owners are not what determines dependency tracking, so `runWithOwner` does not help with tracking in asynchronous functions; use of reactive state in the asynchronous part (e.g. after the first `await`) will not be tracked as a dependency.