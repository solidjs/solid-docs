`Suspense` allows us to show fallback content when data is loading. This is great for initial loading, but on subsequent navigation it is often worse UX to fallback to the skeleton state.

We can avoid going back to the fallback state by leveraging `useTransition`. It provides a wrapper and a pending indicator. The wrapper puts all downstream updates in a transaction that doesn't commit until all async events complete.

This means that when control flow is suspended, it continues to show the current branch while rendering the next off-screen. Resource reads under existing boundaries add it to the transition. However, any new nested `Suspense` components will show "fallback" if they have not completed loading before coming into view.

Notice when you navigate in the example, we keep seeing the content disappear back to a loading placeholder. Let's add a transition in our `App` component. First, let's replace the `updateTab` function:

```js
const [pending, start] = useTransition();
const updateTab = (index) => () => start(() => setTab(index));
```

`useTransition` returns a pending signal indicator and a method to start the transition, which we will wrap around our update.

We should use that pending signal to give an indicator in our UI. We can add a pending class to our tab container div:

```js
<div class="tab" classList={{ pending: pending() }}>
```

And with that our tab switching should be much smoother.
