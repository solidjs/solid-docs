It's sometimes desirable to have Signal reads not be tracked, even inside a reactive context. Solid provides the `untrack` helper as a way to prevent the wrapping computation from tracking any reads.

Let's suppose we did not want to log in our example when `b` changes. We can untrack the `b` signal by changing our effect to the following:

```js
createEffect(() => {
  console.log(a(), untrack(b));
});
```
Since Signals are functions, they can be passed directly, but `untrack` can wrap functions with more complex behavior.

Even though `untrack` disables tracking of reads, it has no effect on writes which still happen and notify their observers.
