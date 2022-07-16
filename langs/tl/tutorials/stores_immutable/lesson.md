Stores are most often created in Solid using Solid's Store proxies. Sometimes we wish to interface with immutable libraries like Redux, Apollo, or XState and need to perform granular updates against these.

In the example, we have a simple wrapper around Redux. You can see the implementation in `useRedux.tsx`. The definition of the store and the actions are in the remaining files.

The core behavior is that we created a Store object and subscribe to the Redux store to update state on update.

```js
const [state, setState] = createStore(store.getState());
const unsubscribe = store.subscribe(
  () => setState(store.getState())
);
```
If you click around the demo adding items and checking them off it seems to work pretty well. However, what isn't obvious is that the rendering is inefficient. Notice the console.log not only on create but whenever you check the box.

The reason is that Solid doesn't diff by default. It assumes the new item is new and replaces it. If your data changes granularly, you don't need to diff. But what if you do?

Solid provides a diffing method `reconcile` that enhances the `setStore` call and lets us diff the data from these immutable sources, only notifying the granular updates.

Let's update that code to:
```js
const [state, setState] = createStore(store.getState());
const unsubscribe = store.subscribe(
  () => setState(reconcile(store.getState()))
);
```
Now the example works as you'd expect, only running the create code on create.

This isn't the only way to solve this and you've seen some frameworks have a `key` property on their template loop flows. The problem is that by making that a default part of the templating, you always need to run list reconciliation and always have to diff all the children for potential changes, even in compiled frameworks. A data-centric approach not only makes this applicable outside of templating but makes it opt in. When you consider that internal state management doesn't need this, it means we default to having the best performance.

Of course, there's no problem using `reconcile` when you need it. Sometimes a simple reducer makes for a great way to organize data updates. `reconcile` shines here, making your own `useReducer` primitive:

```js
const useReducer = (reducer, state) => {
  const [store, setStore] = createStore(state);
  const dispatch = (action) => {
    state = reducer(state, action);
    setStore(reconcile(state));
  }
  return [store, dispatch];
};
```

The behavior of `reconcile` is configurable. A custom `key` can be set and there is a `merge` option which ignores structural cloning and only diffs the leaves.