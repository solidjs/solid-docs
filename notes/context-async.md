# Stream Notes: Context and Async

[Link to the stream](https://www.youtube.com/watch?v=8Ou6domKfU4&ab_channel=RyanCarniato)

## Context

We're going to discuss _how_ Context and _why_ Context. But first, _what_ is Context?

```jsx
const counterContext = createContext();
```

### createContext

`createContext` can take a default data object. This will be passed to a user of the context if it isn't below a Provider in the tree.

This is really powerful for stuff that you expect to always be global. You know the configuration, and you don't want the end user to have to set up a Provider. I use this approach to do some global stuff with `Suspense`.

Other than that default object option, `createContext` isn't responsible for the data itself. It's more about creating a unique symbol so that throughout our tree we can refer to this same type.

Once we have our context, we can call `.Provider` to get our provider component. We pass it a value and some children.

```jsx
<CounterContext.Provider value={data}>{props.children}</CounterContext.Provider>
```

The children will be able to access the value using `useContext`:

```jsx
const value = useContext(CounterContext);
```

### The Context Wrapper Pattern

It's common to wrap both parts.

Wrap the provider so that the end user doesn't have to deal with the `.Provider`, and you can put specific logic in that wrapper too. Sometimes the wrapper takes in a bunch of settings.

```jsx
export function CounterProvider(props) {
  const [count, setCount] = createSignal(props.count || 0),
    store = [
      count,
      {
        increment() {
          setCount((c) => c + 1);
        },
        decrement() {
          setCount((c) => c - 1);
        },
      },
    ];

  return (
    <CounterContext.Provider value={store}>
      {props.children}
    </CounterContext.Provider>
  );
}
```

You can also wrap `useContext`:

```jsx
export function useCounter() {
  return useContext(CounterContext);
}
```

You end up with this pair: `WhateverProvider()` and `useWhatever()` so that the consumer doesn't need access to the original Context at all. As long as you have a `WhateverProvider` above you in the tree, you can call `useWhatever()` and get access to its `value`.

### When do you use Context?

"Prop drilling" is the most natural place to use context. You find yourself passing data from parent to child, then that child passes the data to its children, and so on. Using a context simplifies your code: declare the data in a context, and any child nested down the tree can access it.

Often you'll start building something as a component. Then you start to realize "this was way more than I thought" so you start breaking it into more components. These subcomponents need to share the data, so you pass data from parent to child. At a certain point, you might realize a _separate part of your app_ that's not in this direct tree needs to share your state. Maybe you have data about your user loaded in the main window of your app, and now you need it in the sidebar.

We tend to solve that by "hoisting up" the data - moving it to a shared parent. But depending on how big the app is, that shared parent could be many parents removed.

So, sometimes it happens the "opposite way" to prop drilling, you have data that you only need in one place and suddenly you need it somewhere else.

### Implementing Context is Tricky

I spent a lot of time thinking about Web Components. In that environment, you have the whole DOM tree. You can walk up the tree until you find an element in the tree that provides the context.

The problem with that approach for Solid is due to how our initial render works. When a component renders in Solid, we clone a node, do some work on it, and return an element. Up until this point, our node _isn't connected to the DOM_. The DOM doesn't exist in this setup code.

```jsx
function Counter() {
  const [count, setCount] = createSignal(0);

  const increment = () => setCount(count() + 1);

  return (() => {
    const _el$ = _tmpl$.cloneNode(true);

    _el$.$$click = increment;

    insert(_el$, count);

    return _el$;
  })();
}
```

We don't have access to the DOM until our component function is done, so if it called `useContext` we wouldn't be able to use the DOM to find the provider.

Furthermore, the way JSX and Solid executes, children get called before the parent.

```jsx
function App() {
  return createComponent(Counter, {});
}
```

This exemplifies the point that there's no way to use the DOM (or Virtual DOM) in Solid, and you wouldn't want to.

### How Context works in Solid

In Solid, we have this concept called createRoot. It's basically a createEffect that doesn't track.

That's because any computation in Solid has to be inside a reactive context. They register with each other, so we can handle disposal. We register any child effect with its parent effect, so that when the parent reruns, we can free up the child first. (This is because when the parent effect reruns, it will end up creating the child again, so we need to dispose the child from before.)

Let's look at an example:

```jsx
return (
  <>
    <button type="button" onClick={increment}>
      Click
    </button>
    {count() % 2 ? count() : ""}
  </>
);
```

This gets compiled to

```js
return [
  (() => {
    const _el$ = _tmpl$.cloneNode(true);

    _el$.$$click = increment;
    return _el$;
  })(),
  memo(
    (() => {
      const _c$ = memo(() => count() % 2, true);

      return () => (_c$() ? count() : "");
    })()
  ),
];
```

(Ryan starts saying that this is a bad example, but the point is that) There's a subscription to `count` inside that outer memo. The signal outlives the memo, so if you didn't have a cleanup step, you'd be adding more and more subscriptions to `count` each time the memo runs.

That's one half of why we have createRoot: it handles this cleanup for us. The other reason is because it helps us schedule effects, so they run after render. It's the reason why refs work in `onMount` or `createEffect`. We do all of the pure computation work, then do the rendering, then run the effects, synchronously. So we need to control execution, and createRoot lets us execute effects after render.

`render` hides `createRoot`. 
```jsx
render(() => <Counter />, document.getElementById("app")!);
```
We wrap `Counter` in a function so that it runs _later_. If we just passed `<Counter/>`, it would run before `render` does.

My point is that every computation in Solid is under an effect, to handle both automatic disposal and schedule. So we can implement Context using this effect tree.

### Context in React vs Solid

With the new Context API in React, people started using it components. Redux started thinking "we can simplify our code and get rid of our subscription.